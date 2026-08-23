import prisma from "../../config/database.js";


// generate Bill 
export const generateBill = async (billData) =>{
    const{patientId,appointmentId,items, tax, discount,notes,generatedBy} = billData


    // if patient exists
    const patient = await prisma.patient.findUnique({
        where:{id:patientId},
        include:{
            user:{
                select:{
                    fullName:true, 
                    email:true
                }
            }
        }
    })
    if(!patient){
        throw new Error("patient not found")
    }

    // appointment is provided or not 
    if(appointmentId){
        const appointment= await prisma.appointment.findUnique({
            where:{id:appointmentId},
        })
        if(!appointment)
            throw new Error("appointment  not found")
    }



    // 1 =150   sum=0+150=150+1
    // 2= 100

    // calulate  subtotal
    const subtotal= items.reduce((sum, item)=>  // before taxx add and  subtract dicount 
        sum + item.total,0)
    //     sum=0
    // sum=sum +items.total,0)


    // calculate total amount
    const totalAmount = subtotal + tax - discount 


    // genrate bill and invoice numbers
    const billNumber = `BILL-${Date.now()}-${Math.random().toString(36).substring(2,6).toUpperCase}`  // BIll-2026.10394
    const inVoiceNumber =`INV-${Date.now()}-${Math.random().toString(36).substring(2,6).toUpperCase}` 


    // create bill 
    const bill = await prisma.bill.create({
        data:{
            patientId,
            appointmentId,billNumber,inVoiceNumber,
            items,
            subtotal,totalAmount,notes,generatedBy,
            status:"UNPAID"
        },
        include:{
            patient:{
                include:{
                    user:{
                        select:{
                            id:true,
                            fullName,email:true,
                            phone:true
                        }
                    }
                }
                
            },
            appointment:{
                include:{
                    doctor:{
                        include:{
                            user:{
                                select:{
                                    fullName:true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    // Create audit log
  await prisma.auditLog.create({
    data: {
      userId: genratedBy,
      action: 'Bill generated',
      resource:"Bill",
      details:{
        billId:bill.id,
        patientId,
        appointmentId,
        totalAmount,
        billNumber
      },
      description: `Bill generate with this bill number: ${billNumber}`,
    },
  });



    return bill

    


}


// get all  biill 
export const gettAllBills = async (page=1,limit=10,filters={}) =>{
    const skip = (page-1)*limit  // pagination
    const where ={}
    if(filters.patientId) 
where.patientId= filters.patientId      //select patientId from patient where patientId="8q290854q90"
    if(filters.status) 
        where.status= filters.status;
    if(filters.fromDate) 
        where.generatedAt={gte:new Date(filters.fromDate)}
    if(filters.toDate) 
        where.generatedAt={gte:new Date(filters.toDate)}

// sorting for the search box  by bill number and patientName
    if(filters.search){
        where.OR =[
            {billNumber:{
                contains:filters.search
            }},
            {patient:{user:{fullName:{
                contains:filters.search
            }}}}
        ]
    }

    cons [bills,total]=await Promise.all([
        prisma.bill.findMany({
            where,
            inlcude:{
                patient:{
                    include:{
                        user:{
                            select:{
                                id:true,
                            fullName,email:true,
                            phone:true

                            }

                        }
                    }
                },
                apoontment:{
                include:{
                    docotor:{
                        include:{
                            user:{
                                select:{
                                    fullName:true
                                }
                            }
                        }
                    }
                }
            },
            payments:{
                orderBy:{paymentDate:"desc"}
            }


            },
            skip,take:limit,
            orderBy:{generatedAt:'desc'}
        }),
        prisma.bill.count({where})       // count, sum 


    ])
    return {
        bills,pagination:{
            page,limit,total,
            totalPages:Math.cell(total/limit)
        }
    };


};

// ==========================================
// Get Bill By ID
// ==========================================
export const getBillById = async (billId) => {

    const bill = await prisma.bill.findUnique({
        where: {
            id: billId
        },

        include: {
            patient: {
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            phone: true
                        }
                    }
                }
            },

            appointment: {
                include: {
                    doctor: {
                        include: {
                            user: {
                                select: {
                                    fullName: true
                                }
                            }
                        }
                    }
                }
            },

            payments: {
                orderBy: {
                    paymentDate: "desc"
                }
            }
        }
    });

    if (!bill) {
        throw new Error("Bill not found");
    }

    return bill;
};


// ==========================================
// Get Bill By Invoice Number
// ==========================================
export const getBillByInvoiceNumber = async (invoiceNumber) => {

    const bill = await prisma.bill.findUnique({
        where: {
            invoiceNumber
        },

        include: {
            patient: {
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            phone: true
                        }
                    }
                }
            },

            appointment: {
                include: {
                    doctor: {
                        include: {
                            user: {
                                select: {
                                    fullName: true
                                }
                            }
                        }
                    }
                }
            },

            payments: {
                orderBy: {
                    paymentDate: "desc"
                }
            }
        }
    });

    if (!bill) {
        throw new Error("Bill not found");
    }

    return bill;
};


// ==========================================
// Update Bill
// ==========================================
export const updateBill = async (billId, updateData) => {

    const existingBill = await prisma.bill.findUnique({
        where: {
            id: billId
        }
    });

    if (!existingBill) {
        throw new Error("Bill not found");
    }

    const {
        items,
        tax,
        discount,
        notes,
        status
    } = updateData;

    // Calculate subtotal if items are updated
    let subtotal = existingBill.subtotal;

    if (items) {
        subtotal = items.reduce(
            (sum, item) => sum + Number(item.total),
            0
        );
    }

    const newTax =
        tax !== undefined
            ? Number(tax)
            : Number(existingBill.tax);

    const newDiscount =
        discount !== undefined
            ? Number(discount)
            : Number(existingBill.discount);

    const totalAmount =
        subtotal + newTax - newDiscount;

    const bill = await prisma.bill.update({
        where: {
            id: billId
        },

        data: {
            ...(items && { items }),
            subtotal,
            tax: newTax,
            discount: newDiscount,
            totalAmount,
            ...(notes !== undefined && { notes }),
            ...(status && { status })
        },

        include: {
            patient: {
                include: {
                    user: {
                        select: {
                            fullName: true,
                            email: true,
                            phone: true
                        }
                    }
                }
            },

            appointment: {
                include: {
                    doctor: {
                        include: {
                            user: {
                                select: {
                                    fullName: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return bill;
};


// ==========================================
// Cancel Bill
// ==========================================
export const cancelBill = async (billId, generatedBy) => {

    const existingBill = await prisma.bill.findUnique({
        where: {
            id: billId
        }
    });

    if (!existingBill) {
        throw new Error("Bill not found");
    }

    if (existingBill.status === "CANCELLED") {
        throw new Error("Bill is already cancelled");
    }

    const bill = await prisma.bill.update({
        where: {
            id: billId
        },

        data: {
            status: "CANCELLED"
        }
    });

    // Audit log
    await prisma.auditLog.create({
        data: {
            userId: generatedBy,
            action: "Bill cancelled",
            resource: "Bill",

            details: {
                billId: bill.id,
                billNumber: bill.billNumber
            },

            description:
                `Bill cancelled: ${bill.billNumber}`
        }
    });

    return bill;
};
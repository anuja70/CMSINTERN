import { promise } from "zod";
import prisma from "../../config/database.js";
import MESSAGES from "../../constans/messages.js"

// create patient
export const createPateint=async (patientData)=>{
    const {userId, ...data}=patientData
     

    //  check user if exists
    const user = await  prisma.user.findUnique({
        where:{
            id:userId
        } })
        if (!user){
            throw new Error("User not found")

        }
        // check if user already haved the patient profile
        const existingPatient= await prisma.patient.findUnique({
            where:{id:userId}
        })
        if(existingPatient){
            throw new Error("Patient profile already created or exist with the name of this")
        }


        // check if user is already a doctor
        const existingDoctor= await prisma.doctor.findUnique({
            where:{userId}
        })
        if(existingDoctor){
            throw new Error("user is already registered as a doctor")
        }


        //create patient
        const patient= await prisma.patient.create({
            data:{userId,...data,
                allergies:data.allergies || [],
                medicalHistory:data.medicalHistory || [],


            },
            include :{
                user:{
                    select:{
                        id:true,
                        fullName:true,
                        email:true,
                        phone:true,
                        role:true,
                        isActive:true,
                        isEmailVerified:true,

                    }
                }
            }
        })

        // update user role if not already patient
        if(user.role!="PATIENT"){
            await prisma.user.update({
                where:{id:userId},
                data:{role:"PATIENT"}
            })

        }
        // create audit log
       await prisma.auditLog.create({
        data: {
            userId: user.id,
            action: 'PATIENT_CREATED',
            resource: 'PATIENT',
            details: { patientId:patient.id },
            
        },

    })
    return patient;
}


// get all patient
export const getAllPatient = async (page=1 , limit=10, search=null, gender=null,bloodGroup=null)=>{
    const skip=(page-1)*limit;
    const where = {};
    if(search){
        where.OR=[
            {user:{fullname:{contains:search}}},
            {user:{email:{contains:search}}},
            {user:{phone:{contains:search}}}
        ]
    }
    if(gender){
        where.gender=gender;
    }
    if(bloodGroup){
        where.bloodGroup=bloodGroup
    }

    const [patients,total]=await Promise.all([prisma.patient.findMany({
        where,
        include:{
            user:{
                select:{
                    id:true,
                    fullName:true,
                    email:true,
                    phone:true,
                    role:true,
                    isActive:true,
                    isEmailVerified:true,
                    createdAt:true
                }
                
            },
            appointments:{
                where:{
                    status:{
                        in:['SCHEFULED','CONFIRMED'],
                    }
                },
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
        },
        skip,
        take:limit,
        orderBy:{createdAt:'desc'}
    }),
    prisma.patient.count({where})
])


return {
    patiens,pagination:{
        page,limit,total,totalPages:Math.cell(total/limit)
    }
}


}

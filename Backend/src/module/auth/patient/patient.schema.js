import {z} from "zod"
 
 
 
 export const createPatientSchema = z.object({
    userid:z.string().min(1,'User ID is required'),
    dateOfBirth:z.string().datetime().optional(),
    gender:z.enum(["MALE","FEMALE", "OTHER"]).optional(),
    bloodGroup:z.string().optional(),
    allergies:z.array(z.string()).optional(),
    medicalHistory:z.any().optional(),
    emergencyContact:z.object({
        name:z.string().optional(),
        relationship:z.string().optional(),
        phone:z.string().optional()
    }).optional(),
    address:z.string().optional(),
    city:z.string().optional(),
    province:z.string().optional(),
    country:z.string().optional(),
    zipCode:z.string().optiinal(),
    insuranceProvider:z.string().optional(),
    insuranceNumber:z.string().optional()



    
 })


 /// update patient schema

 export const updatePatientSchema = z.object({
    userid:z.string().min(1,'User ID is required'),
    dateOfBirth:z.string().datetime().optional(),
    gender:z.enum(["MALE","FEMALE", "OTHER"]).optional(),
    bloodGroup:z.string().optional(),
    allergies:z.array(z.string()).optional(),
    medicalHistory:z.any().optional(),
    emergencyContact:z.object({
        name:z.string().optional(),
        relationship:z.string().optional(),
        phone:z.string().optional()
    }).optional(),
    address:z.string().optional(),
    city:z.string().optional(),
    province:z.string().optional(),
    country:z.string().optional(),
    zipCode:z.string().optiinal(),
    insuranceProvider:z.string().optional(),
    insuranceNumber:z.string().optional()



    
 }).partial();





 // get Ptients query schema
 export const getPatientQuerySchema= z.object({
    page:z.string().optional().transform(Number).default('1'),
    limit:z.string().optional().transform(Number).default("10"),
    search:z.string().optional(),
    gender:z.enum(["MALE","FEMALE",'OTHER']) .optional,
    bloodGroup:z.string().optional
})

// 
export const patientSchema =z.object({
    id:z.string().min(1, 'patirent ID id is required')
})
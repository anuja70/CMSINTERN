import prisma from "../../config/database.js";


// create a new medical record
export const createMedicalRecord = async (recordData) => {
 const { patientId,doctorId,appointmentId, ...date } = recordData;
 const patient = await prisma.patient.findUnique({
   where: { id:patientId },
 });
 if (!patientid) {
     throw new Error("Patient not found");
 }
 //doctor 
 const doctor = await prisma.doctor.findUnique({
    where:{ id:doctorId},
    });
 if (!doctorid) {
     throw new Error("Doctor not found");
 }
 //appointment
    const appointment = await prisma.appointment.findUnique({
    where:{ id:appointmentId},
    });
    if (!appointmentid) {
        throw new Error("Appointment not found");
    }
};
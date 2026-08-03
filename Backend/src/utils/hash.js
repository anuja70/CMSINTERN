import bcrypt from "bcrypt";
const salt_rounds = 10; //assignment

export const hashPassword = async (password) =>{
    return await bcrypt.hash(password, salt_rounds)
}

export const comparePassword = async (password, hashpassword) =>{
    return await bcrypt.compare(password, hashpassword)
}
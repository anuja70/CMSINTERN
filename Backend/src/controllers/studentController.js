// get all request

 export const getstudents=async (req,res)=>{
    const students= await [
        {
            id:1,
            name:"Anuja",
            age:21
        },
        {
            id:2,
            name:"Ram",
            age:23
        }
    ]
    res.status(200).json(students,
        {
            message:"all students get sucessfully"
        }
    )

}
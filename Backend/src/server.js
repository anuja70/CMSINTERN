import express, {json} from "express"
import dotenv from "dotenv"
// import { studentRoutes } from "./routes/studentRoutes";


const app= express();


// app.get("/doctors",(req,res)=>{   ///all doctors
//     res.send("welcome to expressjs").status(200).json({message:"appointment created"})
// })
// app.get("/student",(req,res)=>{
//     res.json({
//         id:1,
//         name:"Anuja",
//         course:"MERN stack"
//     })
// })

// // data post garnu xa(POST)

// app.post("/create",(req,res)=>{
//     res.send("post create vayo")
// })
// /// PUT
// app.put("/appointments/:ID",(req,res)=>{
//     res.send("appointment update vayo")
// })
// // delete
// app.delete("/appointments/:ID",(req,res)=>{
//     res.send("appointments delete bhayo")
// })

// app.get("/dcotros/:id",(req,res)=>{   // single get garnu xa vane yo roue url use garxan
//     res.send(req.params.id)
// })
// // multiple parametres (/student/id /rahul)

// app.get("/appointments/:id/:name",(req,res)=>{      
   
//     res.json(req.params)
// })
// // query parameters uses in pagination
// app.get("/d",(req,res)=>{
//     res.json(req.query)
// })

// create crud operation

// create 
app.post("/students/:1",(req,res)=>{
    db.query(
        "INTO students(name, email,age) VALUES(?,?,?)",
        [
            req.body.name,
            req,body,email,
            req.body.age
        ]

    )
    res.status(201).json({
        message:"student created"
    })

})

// get students
app.get("/students",(req,res)=>{
    const [students] = db.query(
        "SELECT * FROM STUDENTS"
);
res.json(students)

})


// update the students
app.put("/students/:id",(req,res)=>{
    db.query(
        "UPDATE students SET name=? where id =?",
        [
            req.body.name,
            req.params.id
        ]
    )
    ///
})


// delete
app.delete("/students/:id",(req,res)=>{
    "DELETE FROM students WHERE id=?",
    [
        req.params.id
    ]
})



/// crud example using prisam

prisma.user.create({
    data:{
        name:"Anuja",
        email:"anuja@gmail.com",
        age:22,
        course:"BIT"
    }
})
const PORT1=process.env.PORT || 3000;

app.listen(PORT1,()=>{
    console.log(`Server unning on port ${PORT1}`)

})

// app.use("/api",studentRoutes)



// //without error handling
// const num=undefined;
// console.log(num.name)  // typeerror cannot read name pripery

// //with error handling
// try{
// // logic
// const num=undefined
// console.log(num.name )

// }
// catch(error){
//     console.log(error.message)

// }
// // const user={
// //     name:"anuja",

// //express with catch try and catch
// app.get("/students",(req,res)=>{
//     try{
//         throw new Error("undefined name")
// const student =undefined
// res.json(student.name);
//     }
//     catch(error){
//         res.status(500).json({
//             success:false,
//             message:error.message
//         })


//     }
// })

// //output
// {
//     "success":false,
//     message:"cannot read propertices of undefined  name"
// }


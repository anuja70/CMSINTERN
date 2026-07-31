import express, {json} from "express"
import dotenv from "dotenv"


const app= express();

app.get("/doctors", (req, res) => {   ///all doctors
    res.send("welcome to expressjs").status(200).json({message:"appointment created"})
})

app.get("/student", (req, res) => {
res.json({
    
    id:1,
    name:"Anuja",
    course:"MERN stack"
   })
})

app.post("/create", (req, res)=>{
    res.send("Student created successfully")
})

///PUT
app.put("/appointments/:ID", (req, res)=>{
    res.send("Appointment updated successfully")
})
// delete
app.delete("/appointments/:ID", (req, res)=>{
    res.send("Appointment deleted successfully")
})
app.get("/doctors/:id",(req,res)=>{   // single get garnu xa vane yo roue url use garxan
    res.send(req.params.id)
})
     // multiple parametres (/student/id /Anuja)

app.get("/appointments/:id/:name",(req,res)=>{
    res.json(req.params)
})
// query parameters uses in pagination
app.get("/doctors",(req,res)=>{
    res.json(req.query)
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
  console.log("our server is running")
})
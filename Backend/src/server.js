import express from "express"
import dotenv from "dotenv"


const app= express();

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/student", (req, res) => {
res.json({
    name: "John Doe",
     age: 20, 
     course: "Computer Science"
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


const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{
  console.log("our server is running")
})
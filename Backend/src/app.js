import express from "express"; 
import morgan from "morgan";
import routes from "./routes/index.js";



 const app = express();
app.use(morgan("dev"));  //  uses ofr the loggging (29ms) npm install morgan
app.use(express.urlencoded({ extended: true })); ///Parses HTML form data.
app.use(express.json());//(it is expree inbuilt middleware function)   // it is used to convert the http payload json into  javascript object to understand the req.body

/// api routes
app.use("/api", routes)


 export default app; 
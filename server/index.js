import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRouter from "./routers/auth.js"
import userRouter from "./routers/users.js"
import productRouter from "./routers/product.js"


dotenv.config();
const app = express();
const PORT = 9000;

const Connection = async ()=>{
    try {
        await mongoose.connect(process.env.URL,{useNewUrlParser:true});
        console.log("db connected !!");       
    } catch (error) {
        console.log(error);
    }
}

Connection();

//middlewares

app.use(express.json())


//end points
app.use("/aak_ecom",authRouter) 
app.use("/aak_ecom/users",userRouter) 
app.use("/aak_ecom/products",productRouter) 

app.listen(PORT, ()=>console.log(`server running at PORT:${PORT}`));
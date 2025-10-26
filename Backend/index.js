import express from 'express';
import dotenv from"dotenv";
import connectDB from './Config/db.js';
import authRouter from './Routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config()
import cors from 'cors'
import userRouter from './Routes/user.route.js';
import listingRouter from './Routes/listing.route.js';
import bookingRouter from './Routes/booking.route.js';

let app=express()
let port=process.env.PORT || 6000;
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter)
app.use("/api/booking",bookingRouter)
app.listen(port,()=>{
    connectDB()
    console.log("server started");
    
})
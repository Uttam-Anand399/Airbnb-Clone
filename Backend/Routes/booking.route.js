import express from "express"
import isAuth from "../middleware/isauth.js"
import { cancelBooking, createBooking } from "../Controllers/booking.controller.js"

let bookingRouter=express.Router()

bookingRouter.post("/create/:id",isAuth,createBooking)
bookingRouter.delete("/cancel/:id",isAuth,cancelBooking)


export default bookingRouter
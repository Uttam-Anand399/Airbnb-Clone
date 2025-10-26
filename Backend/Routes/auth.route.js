import express from "express"
import { login, logOut, signUp } from "../Controllers/auth.controller.js"

const authRouter=express.Router()


authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logOut)

export default authRouter
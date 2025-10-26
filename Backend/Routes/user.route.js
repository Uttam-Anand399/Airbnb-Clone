import express from 'express';

import { getCurrentUser } from '../Controllers/user.controller.js';
import isAuth from '../middleware/isauth.js';

let userRouter=express.Router()

userRouter.get("/currentuser",isAuth,getCurrentUser)


export default userRouter
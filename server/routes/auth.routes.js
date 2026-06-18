import express from "express" ;
import { getMe, login, logout, register } from "../controllers/auth.controller.js";

const authRouter = express.Router() ;

authRouter.post('/register' , register) 
authRouter.post('/login' , login) 
authRouter.post('/logout' , logout)
authRouter.post('/getme', getMe)

export default authRouter ;
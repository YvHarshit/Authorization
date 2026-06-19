import express from "express" ;
import { getMe, login, logout, register, sendVerifyOtp, verifyEmail , sendResetOtp, resetPassword } from "../controllers/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router() ;

authRouter.post('/register' , register) 
authRouter.post('/login' , login) 
authRouter.post('/logout' , logout)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
authRouter.post('/verify-account', userAuth , verifyEmail) 
authRouter.post('/reset-otp', userAuth , sendResetOtp) 
authRouter.post('/reset-password', userAuth , resetPassword) 


authRouter.post('/getme', getMe)

export default authRouter ;
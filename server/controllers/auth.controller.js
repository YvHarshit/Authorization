// Register
// Login
// Logout
// Verify_User
// Password_Reset
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;
import userModel from "../models/user.model.js";
import cookie from "cookie-parser" ;
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body ;

    if(!name || !email || !password){
        return res.json({success : false, message : " missing details "})
    }

    try {
        const existingUser = await userModel.findOne({email}) ;

        if(existingUser) return res.json({success:false, message: " User Already Exist "}) ;

        const hashedPassword = await bcrypt.hash(password, 10) ;

        const user = new userModel({name, email, password: hashedPassword})
        await user.save() ;

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}) ;
        
        res.cookie('token', token, {
            httpOnly: true ,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 *60 * 60 * 1000 ,        
        })   
        
        // Add email sending mechanism
        const mailOptions = {
            from : process.env.Email_User,
            to :  email ,
            subject : 'Welcome' ,
            text : `Welcome buddy, Your are now a registered user with Mail ID - ${email}`
        }


       

        // console.log(process.env.Email_Password) ;
        // console.log(process.env.Email_User) ;

        try {

            await transporter.sendMail(mailOptions) ;
            console.log ("Sent Mail")
            
        } catch (error) {
            console.log("Mail Error : " , error.message)            
        }
       
        return res.json({
            success: true ,
            message:" User Registered " ,
        }) ;
        
    } catch (error) {
        return res.json({
            success: false ,
            message: " Something Wrong..."
        })
        
    }
}


export const login = async (req, res) => {
    const {email, password} = req.body ;

    if(!email || !password){
        res.json({
            success: false ,
            message : "Enter Details" ,
        })
    }

    try {
        const user = await userModel.findOne({email}) ;

        if(!user){
            res.json({
                success: false ,
                message : " Invalid Email, Register First " ,
            })
        }

        const isMatch = await bcrypt.compare(password, user.password) ;

        if(!isMatch){
            res.json({
                success : false ,
                message : " Invalid Password " ,
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'}) ;

        res.cookie('token', token , {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production' ,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' ,
            maxAge : 7 * 24 * 60 * 60 * 1000 ,
        }) ;

        return res.json({
            success : true ,
            message : " User Logged In " ,
        })
        
    } catch (error) {
        res.json({ 
            success: false ,
            message: "Something Wrong Happened " ,
        })        
    }
}


export const logout = async (req, res) => { 
    try {
        res.clearCookie('token', {
            httpOnly: true ,
            secure : process.env.NODE_ENV === 'production' ,
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' ,
        }) ;
        return res.json({
            success: true ,
            messge : " Logged Out "
        })
    } catch (error) {
        return res.json({
            success : false ,
            message : error.message ,
        })
    }
}


export const getMe = async(req, res) => {
    const token = req.headers.authorization?.split(" ")[1] ;

    if(!token){
        return res.json({
            success : false ,
            message: "Token Not found" ,
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) ;

    console.log(decoded) ;

    const user = await userModel.findById(decoded.id) 

    return res.json({
        success : true ,
        message : "User Fetched" ,
        user : {
            name : user.name ,
            email : user.email ,

        }
    })
}


 
export const sendVerifyOtp = async (req,res) => {

    try {
        const {userId} = req.body ;
        const user = await userModel.findById(userId) ;

          if(user.isAccountVerified) {
            return res.json({
                success : false ,
                message : "User Already Verified"
            })
        }
    
        const otp = String (Math.floor (100000 + Math.random() * 900000)) ;

        user.verifyOtp = otp ;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000 ;

        await user.save() ;



        const mailOptions = {
            from : process.env.Email_User ,
             to : user.email ,
             subject : "Account Verification OTP" ,
             text : `Your OTP is ${otp}. Verify your account using this OTP.`

        }      

        await transporter.sendMail(mailOptions) ; 

        res.json({
            success : "true" ,
            message : "Verification Mail Sent on Email."
        })
        
    } catch (error) {
        return res.json({
            success : false ,
             message :  error.message 
        })        
    }
}


export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body ;

    if(!userId ||!otp){
        return res.json({
            success : false ,
            message : "Missing Detail" ,
        })
    }

    try {
        const user = await userModel.findById(userId) ;

        if(!user) {
            return res.json({
                success : false ,
                message : "User Not Found"
            })
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({
                success : false ,
                message : "Invalid OTP",
            })
        }

        if(user.verifyOtpExpireAt < Date.now()) {
            return res.json({
                success : false ,
                message: error.message ,
            })
        }

        user.isAccountVerified = true ;
        user.verifyOtp = '' ;
        user.verifyOtpExpireAt = 0 ;

        await user.save() ;

        return res.json({
            success : true ,
            message : "User Got Verified" ,
        })        
    } 
    catch (error) {
        return res.json({
            success : false ,
            message : error.message ,
        })        
    }
}


export const isAuthenticated = async (req, res) => { 

    //  This work Already Done by MIDDLEWARE  => Only check user Exist or NOT (Almost same Work) .
    // const {userId} = req.body ;

    // if(!userId) {
    //     return res.json({
    //         success : false ,
    //         message : "User Doesn't Exist" ,
    //      })
    // }
    try {
         return res.json ({ success : true })
        
    } catch (error) {
        return res.json ({
            success : false ,
            message : error.message ,
        })
        
    }
}


export const sendResetOtp = async (req, res) => {
    const {email} = req.body;
   
    if(!email) {
        return res.json({
            success: false ,
            message : "Email Required" 
        })
    }

    try {
        const user = await userModel.findOne({email}) ;

        if(!user) {
            return res.json({
                success : false ,
                message : "Email Not Found, Register Yourself"
            })
        }

        const Otp = String (Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = Otp ;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000 ;  // For 15 min
        await user.save() ;


        const mailOptions = {
            from : process.env.Email_User ,
            to : user.email , 
            subject : "Reset Password OTP" ,
            text : `Your OTP is ${Otp}. Reset your Password using this OTP.`
        }

        await transporter.sendMail(mailOptions) ;

        res.json({
            success : "true" ,
            message : "Reset Password Mail Sent on Email."
        })


        
    } catch (error) {
        return res.json ({
            success : false ,
            message : "Phir wohi Error",
        })
        
    }
}


export const resetPassword = async (req, res) => {
    const {email , otp , newPassword} = req.body ;

    if(!email || !otp || !newPassword) {
        return res.json ({
            success : false ,
            message : "Required Field" ,
        })
    }

    try {
        const user = await userModel.findOne({email}) ;

        if(!user) {
            return res.json({
                success : false ,
                message : "User Not Found ."
            })
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({
                success : false ,
                message : "Invalid OTP."
            })
        }

        if(user.resetOtpExpireAt < Date.now()) {
            return res.json({
                success: false ,
                message : "OTP has Expired"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10) ;

        user.password = hashedPassword  ;
        user.resetOtp = '' ;
        user.resetOtpExpireAt = 0 ;

        await user.save() ;

        return res.json({
            success : true, 
            message : "Password has been successfully reset."
        })
     
    } catch (error) {
        return res.json({
            success : false ,
            message : error.message ,
        })
        
    }


}
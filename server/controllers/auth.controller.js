// Register
// Login
// Logout
// Verify_User
// Password_Reset
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;
import userModel from "../models/user.model.js";
import cookie from "cookie-parser" ;
// import transporter from "../config/nodemailer.js";

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
        
        // // Add email sender
        // const mailOptions = {
        //     from : process.env.SENDER_EMAIL,
        //     to : email ,
        //     subject : 'Welcome' ,
        //     text : `Welcome buddy, Your are now a registered user with Mail ID - ${email}`
        // }


        // transporter.verify((err, success) => {
        //     if(err) console.error(err) 
        //     else console.log("SMTP server is running")
        // })

        // await transporter.sendMail(mailOptions) ;
            
       



        
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


 





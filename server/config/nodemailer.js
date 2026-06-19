import nodemailer from "nodemailer"
import dotenv from "dotenv" 

dotenv.config() ;

// console.log("Pass ->",process.env.Email_Password) ;
// console.log("Name ->",process.env.Email_User) ;


const transporter = nodemailer.createTransport({
    service : "gmail" ,
    auth : {
        user : process.env.Email_User ,
        pass : process.env.Email_Password,
    },
});

export default transporter ;
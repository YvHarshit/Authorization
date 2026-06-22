import express from "express" ;
import cors from "cors" ;
import dotenv from "dotenv" ;
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";

dotenv.config() ;


const app = express() ;
app.use(express.json()) ;
app.use(cookieParser()) ;

app.use(cors({origin : "http://localhost:5173",credentials : true}))

const port = process.env.PORT || 4000 ;
connectDB() ;


// api end points
app.get('/', (req, res) => res.send("System Working ")) ; 

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, ()=> {
    console.log(`Hey man, your server running at ${port}`) ;
    //console.log(process.env.MONGO_URL)
//   console.log(process.env.Email_Password) ;
//   console.log(process.env.Email_User) ;
})



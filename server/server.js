import express from "express" ;
import cors from "cors" ;
import dotenv from "dotenv" ;
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
dotenv.config() ;

const app = express() ;
app.use(express.json()) ;

const port = process.env.PORT || 4000 ;
connectDB() ;


// api end points
app.get('/', (req, res) => res.send("System Working ")) ;
app.use('/api/auth', authRouter)

app.listen(port, ()=> {
    console.log(`Hey man, your server running at ${port}`) ;
    //console.log(process.env.MONGO_URL)
//   console.log(process.env.SMTP_USER) ;
//   console.log(process.env.SMTP_PASSWORD) ;
})



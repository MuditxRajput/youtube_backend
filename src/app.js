import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from "express";
const app = express();

app.use(cors())
app.use(express.json(
    {
        limit : "16kb"
    }
))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.router.js';
app.use("/users",userRouter)


export { app };

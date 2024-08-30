import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
config()
let port = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:8080',
    credentials:true
}))
app.use(express.static('public'))
app.use('/users', userRouter)
app.use('/product', productRouter)
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})
import express  from "express";
import Mongoose from "mongoose";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import User from './ApiRoutes/user.js'
import Order from './ApiRoutes/order.js'
import Auth from './ApiRoutes/auth.js'
import Time from './ApiRoutes/date.js'
import cors from 'cors'

dotenv.config()

const connect = async () => {
    try{
        await Mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connect to MongoDB.')
    }catch {
        console.error("Failed to connect to database")
    }  
}

Mongoose.connection.on('Connected', () => {
    console.log('MongoDB connecting!')
})

Mongoose.connection.on('disconnecting', () => {
    console.log('MongoDB disconnecting...')
})

connect()

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/user', User)
app.use('/api/v1/order', Order)
app.use('/api/v1/auth', Auth)
app.use('/api/v1/time', Time)

app.use((error, req, res, next) => {
    const errorStates = error.status || 500;
    const errorMessage = error.message || '中間ApiRouter出錯'
    return res.status(errorStates).json({
        //return回去可以讓next(error) catch
        status:errorStates,
        Message:errorMessage
    })
})

app.get('/', (req, res) => {
    try{
        res.send('This is Homepage')
    }catch {
        res.status(500).send({message:'Server Error'});
    }
})

app.use(cors())


const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})


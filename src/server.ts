import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { db } from './database/'
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

export const dbConnection = async () => {
    try{
        await db.authenticate()
        db.sync()
        console.log("Database connected")
    }
    catch (err){
        const errorMessage = (err as Error)
        console.log(`Error connecting to database ${errorMessage.message}`)
    }
}

export default app
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { db } from './database/'
import {default as budgetRouter} from './routes/budgetRouter'
import dynamicImportDefaults from './utils/dynamicImportDefaults'
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

export const addRoutes = async () => {
    try{
        const modules = await dynamicImportDefaults("./src/routes")
        for(const module of modules){
            app.use(`/api/${module.moduleName.split("Router")[0]}`, module.moduleImported)
        }
    }
    catch (err) {
        const errorMessage = (err as Error)
        console.log(`Error adding routes ${errorMessage.message}`)

    }
}




export default app


import app, {dbConnection} from "./server";
import config from "./config/";
import type { Response } from "express";

const setupServer = async () => {
    try{
        await dbConnection()
        app.listen(config.setupConfig.PORT, () => {
            console.log(`Server listening on port ${config.setupConfig.PORT}`)
        })
    }
    catch (err){
        const errorMessage = (err as Error)
        console.log(errorMessage.message)
    }
}

setupServer()

app.get('/healthCheck', (res: Response) => {
    return res.status(200).json({
        message: "Api is running correctly!!!"
    })
})
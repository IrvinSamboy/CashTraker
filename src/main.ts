import app from "./server.ts";
import config from "./config/index.ts";
import type { Request, Response } from "express";

app.listen(config.setupConfig.PORT, () => {
    console.log(`Server listening on port ${config.setupConfig.PORT}`)
})

app.get('/healthCheck', (res: Response) => {
    return res.status(200).json({
        message: "Api is running correctly!!!"
    })
})
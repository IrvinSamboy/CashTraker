import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() }) 
        }
        next()
    }
    catch (error) {
        const errorMessage = (error as Error)
        console.log(errorMessage.message)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
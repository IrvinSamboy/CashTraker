import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await param('id')
                .isInt().withMessage("Invalid Id")
                .custom(value => value>0).withMessage("Invalid Id")
                .run(req)

        const errors = validationResult(req)
        if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() }) 
        }
        next()
 
    } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage)
            return res.status(500).json({
                message: "Internal server error"
            })
    }
}
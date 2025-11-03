import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import Budget from "../database/models/Budget";

declare global {
    namespace Express {
        interface Request{
            budget? : Budget
        }
    }
}

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

export const validateBudgetExits = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const {id} = req.params
        const budget = await Budget.findByPk(id)
        if(!budget) {
            return res.status(404).json({
                messsage: "Budget not found"
            })
        }

        req.budget = budget

        next()
    } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage)
            return res.status(500).json({
                message: "Internal server error"
            })
    }
}
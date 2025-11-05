import { Request, Response, NextFunction } from "express"
import Expense from "../database/models/expenses"
import { param } from "express-validator"

declare global {
    namespace Express {
        interface Request {
            expense? : Expense
        }
    }
}

export const validateExpensetId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await param('expenseId')
                .isInt().withMessage("Invalid Id")
                .custom(value => value>0).withMessage("Invalid Id")
                .run(req)

        next()

    } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage)
            return res.status(500).json({
                message: "Internal server error"
            })
    }
}


export const validateExpenseExits = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {expenseId} = req.params
        const expense = await Expense.findByPk(expenseId)
        if(!expense) {
            return res.status(404).json({
                messsage: "Budget not found"
            })
        }

        req.expense = expense

        next()
    } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage)
            return res.status(500).json({
                message: "Internal server error"
            })
    }
}
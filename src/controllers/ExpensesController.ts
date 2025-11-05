import { Request, Response } from "express"
import Expense from "../database/models/expenses"

export class ExpenseController {
    
    static create = async (req: Request, res: Response) => {
        try {
            const expense = new Expense(req.body)
            expense.budgetId = req.budget.id

            await expense.save()

            return res.status(200).json({
                message: expense
            })
        } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage.message)
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
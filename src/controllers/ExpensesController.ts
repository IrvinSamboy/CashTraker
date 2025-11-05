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

    static getById = async (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: req.expense
            })
        } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage.message)
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const expense = req.expense
            
            await expense.update(req.body)
            
            res.status(200).json({
                message: "Budget updated correctly"
            })

        } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage.message)
            return res.status(500).json({
                message: "Internal server error"
            })
        }   
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const expense = req.expense
            
            await expense.destroy()
            
            res.status(200).json({
                message: "Budget deleted correctly"
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
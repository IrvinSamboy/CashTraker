import { Request, Response } from "express"
import Budget from "../database/models/Budget"

export class BudgetController {

    static create = async (req: Request, res: Response) => {
        try{
            const { name, amount } = req.body
            const budget = new Budget({
                name: name,
                amount: amount
            })

            await budget.save()

            return res.status(201).json({
                message: budget
            })
        }
        catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage)
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

}
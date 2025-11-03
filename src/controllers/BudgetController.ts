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

    static getAll = async (req: Request, res: Response) => {
        try{
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', "DESC"]
                ]
            })
            if(!budgets) {
                return res.status(404).json({
                    message: "No budgets registered"
                })
            }
            return res.status(200).json({
                message: budgets
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

    static getById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const budget = await Budget.findByPk(id)

            if(!budget) {
                return res.status(404).json({
                    messsage: "Budget not found"
                })
            }

            return res.status(200).json({
                message: budget
            })
            
        } catch (error) {
            const errorMessage = (error as Error)
            console.log(errorMessage)
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

}
import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
const router = Router()

router.post("/", BudgetController.create)

export default router
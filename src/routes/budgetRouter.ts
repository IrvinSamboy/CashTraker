import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
const router = Router()

router.post(
    "/", 
    body("name")
        .notEmpty().withMessage("Name cloud'nt be empty"),
    body("amount")
        .notEmpty().withMessage("Amount cloud'nt be empty")
        .isNumeric().withMessage("Amount cloud be number")
        .custom(value => value > 0).withMessage("Value cloud be greather than 0"),
    handleInputErrors,
    BudgetController.create
)

export default router
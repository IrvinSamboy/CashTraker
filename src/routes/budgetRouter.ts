import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { validateBudgetId, validateBudgetExits } from "../middlewares/budget";

const router = Router()

router.param("budgetId", validateBudgetId)
router.param("budgetId", validateBudgetExits)

router.get(
    "/",
    BudgetController.getAll
)
router.get(
    "/:budgetId",
    BudgetController.getById
)
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

router.put(
    "/:budgetId",
    body("name")
        .optional(),
    body("amount")
        .optional()
        .isNumeric().withMessage("Amount cloud be number")
        .custom(value => value > 0).withMessage("Value cloud be greather than 0"),
    handleInputErrors,
    BudgetController.update
)

router.delete(
    "/:budgetId",
    BudgetController.delete
)

/** EXPENSE ROUTES */

router.post(
    "/:budgetId/expense", 
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
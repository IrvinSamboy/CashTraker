import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Budget from "./Budget";

@Table({
    tableName: "expenses"
})
class Expense extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: String

    @Column({
        type: DataType.DECIMAL
    })
    declare amount: Number

    @ForeignKey(() => Budget)
    declare budgetId : number

    @BelongsTo(() => Budget)
    declare budget: Budget

}

export default Expense
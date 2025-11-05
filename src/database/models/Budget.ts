import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Expense from "./expenses";
@Table({
    tableName: "budgets"
})
class Budget extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number

    @HasMany(() => Expense, {
        onDelete: 'CASCADE'
    })
    declare expenses: Expense[]

}

export default Budget
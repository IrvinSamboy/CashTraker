import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Users from "./Users";
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

    @ForeignKey(() => Users)
    declare userId: number

    @HasMany(() => Expense, {
        onDelete: 'CASCADE'
    })
    declare expenses: Expense[]

    @BelongsTo(() => Users)
    declare user: Users
}

export default Budget
import { Column, Table, Model, DataType, HasMany, AllowNull, Default  } from "sequelize-typescript";
import Budget from "./Budget";

@Table({
    tableName: "users"
})
class Users extends Model {
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare userName: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(6)
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean

    @HasMany(() => Budget)
    declare budget: Budget[]
}

export default Users
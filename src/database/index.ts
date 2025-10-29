import config from "../config/";
import { Sequelize } from "sequelize-typescript";

export const db = new Sequelize(config.setupConfig.DB_URL,
    {
        models: [__dirname + "/models/**/*"],
        dialectOptions: {}
    }
)
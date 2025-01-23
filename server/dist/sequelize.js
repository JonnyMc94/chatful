"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./models/user");
const db_1 = require("./db");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: db_1.dbConfig.host,
    port: db_1.dbConfig.port,
    username: db_1.dbConfig.user,
    password: db_1.dbConfig.password,
    database: db_1.dbConfig.database,
    models: [user_1.User],
});
exports.default = sequelize;

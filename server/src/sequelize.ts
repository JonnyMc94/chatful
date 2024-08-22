import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';
import { dbConfig } from './db'

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    models: [User],
});

export default sequelize;
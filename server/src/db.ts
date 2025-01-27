import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'jonnymcnamee',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'chatfuldb',
  dialect: 'postgres' as const
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
});

export { dbConfig, sequelize };
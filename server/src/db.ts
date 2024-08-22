import { Pool } from 'pg';

const dbConfig = {
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

const pool = new Pool(dbConfig)

export { dbConfig }
export default pool;
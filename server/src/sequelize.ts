import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './models/user';
import { Message } from './models/message';
import { Conversations } from './models/conversations';

dotenv.config({ path: '.env.local' });

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  models: [User, Message, Conversations],
});

console.log('Sequelize instance initialized with models:', sequelize.models);

export default sequelize;
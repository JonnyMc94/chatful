import sequelize from '../sequelize';
import { User } from './user';
import { Message } from './message';

sequelize.addModels([User, Message]);
console.log("Models added")

export { sequelize, User, Message };
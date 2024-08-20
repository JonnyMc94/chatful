const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = require('./User')(sequelize);
const Message = require('./Message')(sequelize);

sequelize.sync();

module.exports = { sequelize, User, Message };
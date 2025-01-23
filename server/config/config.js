const { dbConfig } = require('../dist/db.js');

module.exports = {
  development:  {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: 'postgres'
  },
  test: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: 'postgres'
  },
  production: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: 'postgres'
  }
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Running migration: create-message');
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
    console.log('Migration completed: create-message');
  },
  down: async (queryInterface, Sequelize) => {
    console.log('Reverting migration: create-message');
    await queryInterface.dropTable('Messages');
    console.log('Migration reverted: create-message');
  }
};
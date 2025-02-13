'use strict';

const { AutoIncrement } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Messages', 'conversationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Messages', 'conversationId');
  }
};

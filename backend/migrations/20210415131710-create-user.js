'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: true,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'resetToken', {
      type: Sequelize.STRING,
      allowNull: true // Modify as per your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'resetToken');
  }
};

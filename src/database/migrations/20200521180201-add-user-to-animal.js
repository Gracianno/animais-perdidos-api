'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'animals',
      'user_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('animals', 'user_id');
  }
};

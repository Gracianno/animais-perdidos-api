'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { 
      return queryInterface.createTable('animals', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        },
        info_address: {
          type: Sequelize.STRING,
          allowNull: false
        },
        date_capture:{
          type: Sequelize.DATE,
          allowNull: false
        },
        found: {
          type: Sequelize.BOOLEAN,
          required: true,
          default: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
    
  },

  down: (queryInterface) => {   
      return queryInterface.dropTable('animals');   
  }
};

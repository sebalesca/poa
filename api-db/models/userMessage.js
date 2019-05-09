'use strict'

const cls = require('continuation-local-storage'),
namespace = cls.createNamespace('my-very-own-namespace');
const Sequelize=require('sequelize')
Sequelize.useCLS(namespace);
const setupDataBase= require('../lib/db')

module.exports=function setupAgentModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('usersMessages', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },    
    receiver:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    read:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    sendDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    readAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
    

  })
}

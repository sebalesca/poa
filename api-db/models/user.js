'use strict'

const cls = require('continuation-local-storage'),
namespace = cls.createNamespace('my-very-own-namespace');
const Sequelize=require('sequelize')
Sequelize.useCLS(namespace);
const setupDataBase= require('../lib/db')

module.exports=function setupAgentModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('user', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },    
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password:{
      type:Sequelize.STRING,
      allowNull:false
    },
    connected:{
      type:Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:false
      
    },
    rol:{
      type:Sequelize.STRING,
      allowNull:false
    }

  })
}

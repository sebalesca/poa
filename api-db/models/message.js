'use strict'

const cls = require('continuation-local-storage'),
namespace = cls.createNamespace('my-very-own-namespace');
const Sequelize=require('sequelize')
Sequelize.useCLS(namespace);
const setupDataBase= require('../lib/db')


module.exports=function setupAgentModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('message', {   
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue:0
    }


  })
}

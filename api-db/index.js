'use strict'
const setupDataBase = require('./lib/db')
const setupMessageModel= require('./models/message')
const setupUserModel= require('./models/user')
const setupUserMessageModel= require('./models/userMessage')
const defaults= require('defaults')//para valores por defecto 
//funcionalidad de las clases
const setupUser= require('./lib/user')
const setupMessage=require('./lib/message')
const setupUserMessage= require('./lib/userMessage')

module.exports = async function (config) {
  //si no recibe configuracion asume que es de prueba
  config = defaults(config,{
    dialect:'sqlite',
    pool:{
      max:10,
      min:0,
      idle:10000
    },
    query:{
      raw:true
    }
  })

  //modelos de base de datos
  const sequelize = setupDataBase(config)  
  const MessageModel= setupMessageModel(config)
  const UserModel= setupUserModel(config)
  const UserMessageModel= setupUserMessageModel(config)

  
  //se agregan las relaciones de las clases 
  UserModel.hasMany(UserMessageModel)
  UserMessageModel.belongsTo(UserModel)

  MessageModel.hasMany(UserMessageModel)
  UserMessageModel.belongsTo(MessageModel)

  //UserMessageModel.belongsToMany(MessageModel,{through: 'UserProject'})
  // verifica que esxista la conexion con la base de datos
  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
     
  }

  const User = setupUser(UserModel,MessageModel)  
  const Message = setupMessage(MessageModel)
  const UserMessage = setupUserMessage(UserMessageModel,UserModel,MessageModel)  
  /* if(config.setup){
     se crea el usuario admin 
  const user = await User.createOrUpdate({      
    uuid:'yyy-yyy-yyz',
    username:'administrador',
    email:'admin@gmail.com',
    password:'admin',
    connected:false,
    createdAt: new Date(),
    updatedAt: new Date(),
    rol:'admin'

}).catch(handleFatalError)
console.log('este es el usuario admin para altas de usuario')
console.log(user)
  } */

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  //mato el proceso 
  process.exit(1)
}
  return {
    User,
    Message,
    UserMessage
  }
}

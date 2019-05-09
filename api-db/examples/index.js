'use strict'

const db = require('../')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'api',
    username: process.env.DB_USER || 'poa',
    password: process.env.DB_PASS || 'poa',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }

  const {User, Message,UserMessage } = await db(config).catch(handleFatalError)
  const user = await User.createOrUpdate({      
      uuid:'yyy-yyy-yyz',
      username:'carilila',
      email:'joa@gmail.com',
      password:'joa',
      connected:true,
      createdAt: new Date(),
      updatedAt: new Date()

  }).catch(handleFatalError)

  console.log('--user--')
  console.log(user)

  const users = await User.findByUsernamePassword('sebalesca','carilila').catch(handleFatalError)
  console.log('--busqueda por username y password--')
  console.log(users)

  

let m1={  
  uuid:'yyy-yyy-yyz',
  body:'hola como estas? saludos',
  priority:1,
  createdAt: new Date(),
  updatedAt: new Date()
}
  const message= await Message.createOrUpdate(m1)
  console.log('message')
  console.log(message)
  
  
  let uM={    
    uuid:'yyy-yyy-yyz',    
    receiver:1,
    read:false,
    sendDate:new Date(),
    readAt:new Date(),
    createdAt: new Date(),
    updatedAt: new Date()    
}
//create (uuidUser,receiver,uuidMessge, userMessage) {
  const userMessage= await UserMessage.create(user.uuid,uM.receiver,m1.uuid,uM)
  console.log('userMessage')
  console.log(userMessage)
  
  const allMessageUser= await UserMessage.findMessageByUserId(1)

  console.log(allMessageUser)
  /*
  const metrics = await Metric.findByAgentUuid(agent.uuid).catch(handleFatalError)
  console.log('--metrics--')
  console.log(metrics)

  const metric = await Metric.create(agent.uuid, {
    type: 'memory',
    value: '300'
  }).catch(handleFatalError)

  console.log('--metric--')
  console.log(metric)

  const metricsByType = await Metric.findByTypeAgentUuid('memory', agent.uuid).catch(handleFatalError)
  console.log('--metrics--')
  console.log(metricsByType)*/
}
//manejo de errores
function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  //mato el proceso 
  process.exit(1)
}

run()

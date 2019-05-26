'use strict'

const debug = require('debug')('message:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const authl= require('../auth')
const guard = require('express-jwt-permissions')()
const db = require('../../api-db')
const bodyParser = require('body-parser')
const config = require('../config')
const uuidv1 = require('uuid/v1')
const tools= require('../lib/tools')
const api = asyncify(express.Router())

let services,User, Message, UserMessage

let urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/x-www-form-urlencoded

 
// parse application/json
api.use(bodyParser.json())

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    User = services.User
    Message = services.Message
    UserMessage= services.UserMessage
  }
  
  next()
})


api.get('/messages', auth(config.auth), async (req, res, next) => {
  debug('A request has come to /messages')
  //obtengo token de la cabecera
  let token=req.header('Authorization')
  //lo paso a un array con split
  let TokenArray= token.split(' ')
  console.log(req.header('Authorization'))
  //decodifico el token
  let user=authl.verify(TokenArray[1],config.auth.secret)  
  console.log(user)
  if (!user) {
    return next(new Error('Not authorized'))
  }

  let userMessages
  let resp
  let message
  try {   
       userMessages = await UserMessage.findMessageByUserId(user.userId)
       //mensajes= await User.getMessagesbyId(user.userId)
       //console.log(mensajes)       
       //userMessages = await UserMessage.findMessageByReceiver(user.userId)
       for (let index = 0; index < userMessages.length; index++) {
        let element = userMessages[index]
        let remitente= await User.findById(element.Remitente)
        console.log(remitente.username)
        let sms=await Message.findById(element.messageId)
        userMessages[index].mensaje=sms.body
        userMessages[index].Remitente=remitente.username       
      
       } 
       
        resp={
        "status": "Ok",
        "totalMensajes":userMessages.length,
        "mensajesRecibidos": userMessages
        }
    
  } catch (e) {
    return next(e)
  } 

  res.send(resp)
}) 

api.post('/messages',auth(config.auth), async (req,res,next)=>{
  let user=tools.obtenerPayload(req)  
  console.log(user)
    let mensaje=req.body.mensaje
    let destinatarios= req.body.destinatarios
    //console.log(mensaje)
    /* console.log(destinatarios) */
  try {    

    if (!mensaje || !destinatarios) {
      return next(new Error('Formato invalido'))
    }   

    const newMessage= await Message.createOrUpdate({
      uuid:uuidv1(),
      body:mensaje,
      priority:0
    })
    if(newMessage)
    {
      for (let index = 0; index < req.body.destinatarios.length; index++) {
        let element = req.body.destinatarios[index]        
        
        let datosReceptor= await User.findByUsername(element.username)
        if(datosReceptor.id != user.userId){
          let userMesasage={
            uuid:uuidv1(),    
            receiver:datosReceptor.id,
            read:false,
            sendDate:new Date(),
            createdAt: new Date()
            }
          //creador del mensaje, receptor
          //console.log(datosReceptor)
          let msg= await UserMessage.create(user.uuid,datosReceptor.id,newMessage.id,userMesasage)
         // console.log(msg)
        }else{
          console.log('no encuentra username')
          console.log(element)
        }
      }
      res.json({'status':'ok','message':'se ha registrado correctamente'})
    }
    
  } catch (error) {
    return handleFatalError(error)
    next()
  }

})

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  //mato el proceso 
  process.exit(1)
}
module.exports = api

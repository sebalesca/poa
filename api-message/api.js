'use strict'

const debug = require('debug')('message:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const authl= require('./auth')
const guard = require('express-jwt-permissions')()
const db = require('../api-db')
const bodyParser = require('body-parser')
const config = require('./config')
const tools= require('./lib/tools')

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
api.post('/logout',auth(config.auth), async (req, res, next) => {
  console.log('logout')
  let user=tools.obtenerPayload(req)
  
  console.log(user)
  if(user){
    try {
      let id=user.userId
      let existingUser= await User.findById(id)
      existingUser.connected=false
      existingUser.token=user.token
      let resp= await User.createOrUpdate(existingUser)
      if(resp){
        res.json('logout success')
      }
      next()
    } catch (error) {
      next()
      return tools.handleFatalError(error)
    } 


  } 
  next()
})
api.post('/login', bodyParser.json(), async (req,res,next)=>{
  console.log('a recuest has come to post')
  let {username,password} =req.body
  console.log(`usuario ${username}, contraseña ${password}`)
  let existingUser= await User.findByUsernamePassword(username,password)
  console.log(existingUser)
  if(!existingUser){

    return res.json('credenciales invalidas')
    
  }
  let payload={
    username:username,
    userId:existingUser.id,
    rol:existingUser.rol,
    uuid:existingUser.uuid
    }
  
  existingUser.connected=true  
  let token=(authl.sign(payload,config.auth.secret,{expiresIn: 60 * 30 }))
  existingUser.token=null
  let resp= await User.createOrUpdate(existingUser)
  console.log(resp) 
    res.json({
      token:token,
      username:username      
    })
   next()
  })


function extend (obj,values){
    //clonamos el objeto y le cambiamos los values 
    const clone = Object.assign({},values)
    return Object.assign(clone,values)
}
module.exports = api

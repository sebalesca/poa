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
  console.log(req.url)
  next()
})
api.get('/users/connected',auth(config.auth),async (req,res,next)=>{
  
  try {
    let connected= await User.findConnected()
    res.json(connected)
    
  } catch (error) {
    
    return handleFatalError(error)
  }
  next()
})
api.post('/users',auth(config.auth),async (req,res,next)=>{
  console.log('a recuest has user')
  let {username,password,rol,email,avatar}= req.body
  //crear el uuid
  if(!username || !password || !rol || !email || !avatar){
    return res.json({"status": "Error","message": "todos los datos son obligatorios"})
  }
  let user=tools.obtenerPayload(req)
  if(user && user.rol=='admin') {    
    try {
      console.log('admin puede dar altas')
      let exist= await User.findByUsername(username)
      if(exist){
        return res.json({"status": "Error","message": "Usuario duplicado"})
      }
    let newUser={
      username,
      password,
      rol,
      email,
      avatar,
      uuid:uuidv1(),
      createAt: new Date()
    }
    console.log(newUser)
      let resp= await User.createOrUpdate(newUser)
      resp.message='Alta exitosa'
      resp.status='ok'
      console.log(resp)
      res.send(resp)
      
    } catch (error) {
      console.log('entro error alta')
      return handleFatalError(error)
      
    }
  }else{
    res.json({"status": "Error","message": "Solo el admin puede dar Altas"}) 
  }
  
  //res.send('not authorization')
next()
})
function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  //mato el proceso
  process.exit(1)
}
module.exports = api

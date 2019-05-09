'use strict'
const config = require('../config')
const authl= require('../auth')

function obtenerPayload(req){
   
  //obtengo token de la cabecera
  let token=req.header('Authorization')
  //lo paso a un array con split
  let TokenArray= token.split(' ')
  console.log(req.header('Authorization'))
  //decodifico el token
  let user=authl.verify(TokenArray[1],config.auth.secret)
  return user  
}

function extend (obj,values){
  //clonamos el objeto y le cambiamos los values 
  const clone = Object.assign({},values)
  return Object.assign(clone,values)
}
function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  //mato el proceso 
  process.exit(1)
}

module.exports={
    obtenerPayload,
    extend,
    handleFatalError
}
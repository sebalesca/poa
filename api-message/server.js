'use strict'

const debug = require('debug')('message:api')
const http = require('http')
const chalk = require('chalk')
const express = require('express')
const asyncify = require('express-asyncify')
const authl= require('./auth')
const login = require('./api')
const messages= require('./lib/message')
const bodyParser = require('body-parser')
const config = require('./config')//borrar
const user= require('./lib/user')

const port = process.env.PORT || 8080
const app = asyncify(express())
const cors = require('cors')
//const app = require('express')
const server = http.createServer(app)

//cors
app.use(cors())
app.use('/api', login)
app.use('/api',messages)
app.use('/api',user)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[message-api]')} server listening on port ${port}`)
  })
}/* 
process.on('SIGHUP', () => {
  console.log('SIGHUP');
})
process.kill(process.pid,'SIGHUP') */
module.exports = server

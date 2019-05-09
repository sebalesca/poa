'use strict'

const debug = require('debug')('api:db:setup')
const db = require('./')
const inquirer= require('inquirer')
const chalk= require('chalk')

const prompt= inquirer.createPromptModule()
async function setup () {
  //genero la pregunta para evitar que se destruya la base y se cree de 0
  const answer= await prompt([
    {
      type:'confirm',
      name: 'setup',
      message: 'Atencion!! esto destruira la base de datos, esta seguro?'
    }
  ])

  if (!answer.setup){
    return console.log('Tranki, no paso nada :)')
  }
  // objeto configurable por variables de entorno sino las que se ponen por defecto de desarrollo
  const config = {
    database: process.env.DB_NAME || 'api',
    username: process.env.DB_USER || 'poa',
    password: process.env.DB_PASS || 'poa',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    loggig: s => {
        return debug(s);
    },
    setup: true

  }
  await db(config).catch(handleFatalError)
  // si todo va bien lo
  console.log('success')
  process.exit(0)
}

// esta funcion cachea el error y lo saca por consola
function handleFatalError (err) {
  console.error(`${chalk.red('Error fatal:')} ${err.message}`)
  console.error(err.stack)
  pocess.exit(1)
}
setup()

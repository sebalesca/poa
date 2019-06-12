import apiMessageService from './api-messages'

const messageService = {}
let config = { bodyType: 'json' }

messageService.traer = function (token) {
  config.headers = {
    'Authorization': `Bearer ${token}`
  }
  return apiMessageService.get('/messages', config)
    .then(function (res) {
      return res.data
    })
}
messageService.leido = function (id, token) {
  console.log(token)
  config.headers = {
    'Authorization': `Bearer ${token}`
  }
  return apiMessageService.post('/messages/read', { id }, config)
    .then(function (res) {
      return res.data
    })
}
messageService.enviar = function (mensaje, destinatarios, token) {
  config.headers = {
    'Authorization': `Bearer ${token}`
  }
  return apiMessageService.post('/messages',
    { mensaje, destinatarios }, config)
    .then(function (res) {
      return res.data
    })
}

export default messageService

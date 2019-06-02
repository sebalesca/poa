import apiMessageService from './api-messages'

const securityService = {}
let config = { bodyType: 'json' }

securityService.login = function (username, password) {
  return apiMessageService.post('/login', {
    username, password
  },
  config
  )
    .then(function (res) {
      return res.data
    })
}
securityService.logout = function (token) {
  console.log(token)
  config.headers = {
    'Authorization': `Bearer ${token}`
  }
  return apiMessageService.post('/logout', {}, config)
}
export default securityService

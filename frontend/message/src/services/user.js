import apiMessageService from './api-messages'

const userService = {}
let config = { bodyType: 'json' }

userService.add = function (username, password, rol, avatar, email, token) {
  config.headers = {
    'Authorization': `Bearer ${token}`
  }
  return apiMessageService.post('/users', {
    username, email, password, rol, avatar
  },
  config
  )
    .then(function (res) {
      return res.data
    })
}
userService.ContactConected = function (token) {
  config.headers = {
    'Authorization': `Bearer ${token}`
  }
  console.log(`este es el token:${token}`)
  return apiMessageService.get('/users/connected',
    config
  )
    .then(function (res) {
      return res.data
    })
}

export default userService

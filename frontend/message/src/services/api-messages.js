import trae from 'trae'
import configService from './config'

const messageService = trae.create({
  baseUrl: configService.apiUrl
})

export default messageService

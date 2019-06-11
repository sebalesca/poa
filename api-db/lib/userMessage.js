'use strict'

module.exports= function setupUserMessage(UserMessageModel,UserModel,MessageModel){
    function findById(id){
        return UserMessageModel.findById(id)        
    }
    function findMessageByUserId(userId,){
        
        return UserMessageModel.findAll({ 
          attributes: [['userId','Remitente'], ['sendDate','Enviado'],['read','Leido'],'messageId','id'],           
          where:{
                receiver:userId,
                
            }

        })
    }
    function findMessageByReceiver(receiver){
        return UserMessageModel.findAll({
            where:{
                receiver
            }
        })
    }
   
    function findByUuId(uuId){        
        return UserMessageModel.findOne({
            where:{
              uuId
            }
        })
    }


    async function create (uuidUser,receiver,idMessage, userMessage) {
        
      console.log(receiver)
      let user = await UserModel.findOne({
          where: { uuid:uuidUser }
        })
        /* let message= await MessageModel.findOne({
          where:{
            uuid:uuidMessge
          }
        }) */
        if (user) {
          Object.assign(userMessage,{userId:user.id,receiver:receiver,messageId:idMessage})
          
          const result = await UserMessageModel.create(userMessage)
          return result.toJSON()
        }
      }

    /*
    
     async function findByAgentUuid (uuid) {
    return MetricModel.findAll({
      attributes: [ 'type' ],
      group: [ 'type' ],
      include: [{
        attributes: [],
        model: AgentModel,
        where: {
          uuid
        }
      }],
      raw: true
    })
  }

  async function findByTypeAgentUuid (type, uuid) {
    return MetricModel.findAll({
      attributes: [ 'id', 'type', 'value', 'createdAt' ],
      where: {
        type
      },
      limit: 20,
      order: [[ 'createdAt', 'DESC' ]],
      include: [{
        attributes: [],
        model: AgentModel,
        where: {
          uuid
        }
      }],
      raw: true
    })
  }

  
    
    
    
    */




    return{
        findById,
        findByUuId,
        findMessageByUserId,
        findMessageByReceiver,
        create
        
    }
}
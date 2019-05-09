'use strict'
module.exports= function setupMessage(MessageModel){
    function findById(id){
        return MessageModel.findOne({
            where:{
                id
            }
        })        
    }
    function findByUuId(uuid){
        return MessageModel.findOne({
            where:{
                uuid
            }
        })
    }

    async function createOrUpdate(message){
    const cond={
        where:{
            uuid:message.uuid
        }
    } 
    const existingMessage= await MessageModel.findOne(cond)
    if(existingMessage){
        const updated= await MessageModel.update(message,cond) 
        return updated ? MessageModel.findOne(cond) : existingMessage
    }
    const result= await MessageModel.create(message)
    return result.toJSON()
    }

   

    return{
        createOrUpdate,
        findById,
        findByUuId
    }
}
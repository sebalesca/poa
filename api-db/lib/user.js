'use strict'

module.exports= function setupUser(UserModel,MessageModel){
    function findById(id){ 
        return UserModel.findOne({
        where:{
            id
        }
    })        
    }
    /* function getMessagesbyId(id){
        return UserModel.findAll({
            where:{
                id
            }
        })
    } */
    function findByUuid(uuid){
        return UserModel.findOne({
            where:{
                uuid
            }
        })
    }

    async function createOrUpdate(user){
    const cond={
        where:{
            uuid:user.uuid
        }
    } 
    const existingUser= await UserModel.findOne(cond)
    if(existingUser){
        const updated= await UserModel.update(user,cond) 
        return updated ? UserModel.findOne(cond) : existingUser
    }
    const result= await UserModel.create(user)
    return result.toJSON()
    }

    function findConnected(){
        return UserModel.findAll({
            attributes: ['username', 'connected'],
            where:{
                connected:true
            }
        })
    }

    function findByUsername(username){
        return UserModel.findOne({
            attributes:['username','uuid','rol','id'],
            where:{
                username
                
            }

        })
    }
    function findByUsernamePassword(username,password){
        return UserModel.findOne({
            attributes:['username','uuid','rol','id'],
            where:{
                username,                
                password
            }

        })
    }
    return{
        findById,
        findByUuid,
        createOrUpdate,
        findConnected,
        findByUsername,
        findByUsernamePassword
        
    }
}
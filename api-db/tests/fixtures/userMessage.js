'use strict'

const UserMessage={
    id:1,
    uuid:'yyy-yyy-yyz',    
    receiver:1,
    read:false,
    sendDate:new Date(),
    readAt:new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId:1,
    messageId:2
}

const UserMessages =[
    UserMessage,
    extend(UserMessage,{id:2, uuid:'yyy-yyy-yyy',receiver:2, read:true,userId:1,messageId:2}),
    extend(UserMessage,{id:3, uuid:'yyy-yyy-yyu',receiver:2, read:true,userId:2,messageId:2}),
    extend(UserMessage,{id:4, uuid:'yyy-yyy-yye',receiver:2, read:true,userId:3,messageId:3}),
    extend(UserMessage,{id:5, uuid:'yyy-yyy-yyt',receiver:2, read:true,userId:1,messageId:4}),
    
]
function extend (obj,values){
    //clonamos el objeto y le cambiamos los values 
    const clone = Object.assign({},values)
    return Object.assign(clone,values)
}
module.exports= {
    single:UserMessage,
    all:UserMessages,    
    findByUuId: id=>UserMessages.filter(um=>um.uuid==id).shift(),
    findMessageByUserId:idUser=> UserMessages.filter(um=>um.userId==idUser),
    findMessageByReceiver:reciever=>UserMessages.filter(um=>um.receiver==reciever)

}
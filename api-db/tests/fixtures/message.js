'use strict'

const Message={
    id:1,
    uuid:'yyy-yyy-yyz',
    body:'hola como estas? saludos',
    priotity:1,
    createdAt: new Date(),
    updatedAt: new Date()
}

const Messages =[
    Message,
    extend(Message,{id:3, uuid:'yyy-yyy-yyy',body:'tenemos parcial el lunes', priotity:1}),
    extend(Message,{id:4, uuid:'yyy-yyy-yyu',body:'yo lo sabia ', priotity:1}),
    extend(Message,{id:5, uuid:'yyy-yyy-yyi',body:'este jueves tenemos cursada',  priotity:1}),
    extend(Message,{id:6, uuid:'yyy-yyy-yyo',body:'ok. nos vemos',priotity:1})
    
]
function extend (obj,values){
    //clonamos el objeto y le cambiamos los values 
    const clone = Object.assign({},values)
    return Object.assign(clone,values)
}
module.exports= {
    single:Message,
    all:Messages,    
    findByUuid: id=>Messages.filter(u=>u.uuid==id).shift(),
    findById:id=> Messages.filter(u=>u.id==id).shift()

}
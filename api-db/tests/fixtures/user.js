'use strict'

const User={
    id:1,
    uuid:'yyy-yyy-yyz',
    username:'sebalesca',
    email:'sebalesca83o@gmail.com',
    password:'carilila',
    connected:true,
    createdAt: new Date(),
    updatedAt: new Date()
}

const Users =[
    User,
    extend(User,{id:3, uuid:'yyy-yyy-yyy',username:'ethan', email:'ethan@gmail.com',password:'fornite',connected:false}),
    extend(User,{id:4, uuid:'yyy-yyy-yyu',username:'oscar', email:'oscar@gmail.com',password:'breapozo',connected:true}),
    extend(User,{id:5, uuid:'yyy-yyy-yyi',username:'rita', email:'rita@gmail.com',password:'oscar',connected:false}),
    extend(User,{id:6, uuid:'yyy-yyy-yyo',username:'andrea', email:'andrea@gmail.com',password:'pablo',connected:false})

]
function extend (obj,values){
    //clonamos el objeto y le cambiamos los values 
    const clone = Object.assign({},values)
    return Object.assign(clone,values)
}
module.exports= {
    single:User,
    all:Users,
    connected: Users.filter(u=>u.connected),
    findByUuid: id=>Users.filter(u=>u.uuid==id).shift(),
    findById:id=> Users.filter(u=>u.id==id).shift(),
    username: Users.filter(u=>u.username=='sebalesca').shift()

}
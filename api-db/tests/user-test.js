'use strict'

const test = require('ava')
const proxyquire= require('proxyquire')
const sinon = require('sinon')//global para pruebas 
const userFixture= require('./fixtures/user')

//variable global de la conexion
let config = {
    logging: function(){}
}
//creo el mock  para la prueba
let UserMessageStub={
    belongsTo:sinon.spy()
}
let MessageStub={
    hasMany:sinon.spy()
}
let UserStub=null
let db = null
let sandbox= null
let single= Object.assign({},userFixture.single)
let id=1
let uuid='yyy-yyy-yyz'
let uuidArgs={
    where:{
        uuid
    }
}
let newUser={
    id:1,
    uuid:'yyy-yyy-yyl',
    username:'joaquina',
    email:'joa@gmail.com',
    password:'joa',
    connected:true,
    createdAt: new Date(),
    updatedAt: new Date()
}
let connectedArgs={
    where:{connected:true}
}

let usernameArgs={
    where:{username:'sebalesca'}
}


//este hook se ejecuta antes de los test
test.beforeEach(async()=>{
    sandbox= sinon.createSandbox()
    //creo el mock de la pruba de user
    UserStub={
        hasMany:sandbox.spy()
    }

    //model findAll
    UserStub.findAll= sandbox.stub()
    UserStub.findAll.withArgs().returns(Promise.resolve(userFixture.all))
    UserStub.findAll.withArgs(connectedArgs).returns(Promise.resolve(userFixture.connected))
    UserStub.findAll.withArgs(usernameArgs).returns(Promise.resolve(userFixture.username))

    //Model create
    UserStub.create=sandbox.stub()
    UserStub.create.withArgs(newUser).returns(Promise.resolve({
        toJSON(){return newUser}
    }))
    // model findOne
    UserStub.findOne= sandbox.stub()
    UserStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(userFixture.findByUuid(uuid)))
    //model update
    UserStub.update= sandbox.stub()
    UserStub.update.withArgs(single,uuidArgs).returns(Promise.resolve(single))
    //le agrego la funcion de prueba 
    UserStub.findById= sandbox.stub()
    //cuando sea llamda la funcion con el argumento id el resultado sera el resultado del fixture de prueba
    UserStub.findById.withArgs(id).returns(Promise.resolve(userFixture.findById(id)))

    //levanto los objetos de pruebas
    const setupDataBase= proxyquire('../',{
        './models/user':()=> UserStub,
        './models/userMessage':()=> UserMessageStub,
        './models/message':()=>MessageStub
    })

    db = await setupDataBase(config)
})

test.afterEach(() =>{
sandbox && sandbox.restore()
})
test('User',t => {
    t.truthy(db.User,'User service should exist')
})

test.serial('setup',t =>{
    t.true(UserStub.hasMany.called,'UserModel.hasMany was execute')
    // me aseguro que pase como parametro un usermessage
    t.true(UserStub.hasMany.calledWith(UserMessageStub),'arguments shoulb be usermessageModel')
    //me aseguro que dependa de un usermodel
    t.true(UserMessageStub.belongsTo.called,'UserMessageModel.belongsTo was execute')
    t.true(UserMessageStub.belongsTo.calledWith(UserStub),'argument should be userModel')

})

test.serial('User#findById', async t=>{
    //traigo el posta de 
    let user= await db.User.findById(id)
    //lo compara con la prueba
    t.true(UserStub.findById.called,'findById should be called on model')//lamada desde el modelo
    t.true(UserStub.findById.calledOnce,'findById should be called one')//solo debe ser llamada 1 vez
    t.true(UserStub.findById.calledWith(id),'findById should be called with same id')// tiene que ser el mismo id pasado a la funcion sin modificar
    t.deepEqual(user,userFixture.findById(id),'should by the same')
})

test.serial('user#createOrUpdated - exist user',async t=>{
    let user= await db.User.createOrUpdate(single)
    t.true(UserStub.findOne.called,'findOne should be called on model')
    t.true(UserStub.findOne.calledTwice,'findOne should be called twice')
    t.true(UserStub.update.calledOnce,'update should be called once')
    
    t.deepEqual(user,single,'should be the same')
})

test.serial('user#createOrUpdated -New user',async t=>{
    let user= await db.User.createOrUpdate(newUser)
    t.true(UserStub.findOne.called,'findOne should be called on model')
    t.true(UserStub.findOne.calledOnce,'findOne should be called once')    
    t.true(UserStub.findOne.calledWith({
        where:{uuid:newUser.uuid}
    }),'findOne should be called with uuid args')
    t.true(UserStub.create.called,'should be called on model')
    t.true(UserStub.create.calledOnce,'should by called once')
    t.true(UserStub.create.calledWith(newUser),'should by called with user model')
    
    t.deepEqual(user,newUser,'should be the same')
}) 
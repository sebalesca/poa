'use strict'

const test = require('ava')
const proxyquire = require('proxyquire')
const sinon=require('sinon')
const messageFixture= require('./fixtures/message')
//variable global de la conexion
let config = {
    logging: function(){}
}
let UserMessageStub={
    belongsTo:sinon.spy()
}
let UserStub={
    hasMany:sinon.spy()
}
let MessageStub= null
let db = null
let sandbox= null
let single= Object.assign({},messageFixture.single)
let id=1 
//este hook se ejecuta antes de los test
test.beforeEach(async()=>{
    sandbox= sinon.createSandbox()
    MessageStub={
        hasMany: sandbox.spy()
    }
    MessageStub.findById=sandbox.stub()
    MessageStub.findById.withArgs(id).returns(Promise.resolve(messageFixture.findById(id)))
    const setupDataBase= proxyquire('../',{
        './models/message.js':()=> MessageStub,
        './models/userMessage.js':()=>UserMessageStub,
        './models/user':()=>UserStub
    })
    db = await setupDataBase(config)
})

test.afterEach(() =>{
    sandbox && sandbox.restore()
    })

test('Message',t =>{
    t.truthy(db.Message,'Message service should exist')
})

test.serial('setup',t =>{
    t.true(MessageStub.hasMany.called,'MessageModel.hasMany was execute')
    // me aseguro que pase como parametro un usermessage
    t.true(MessageStub.hasMany.calledWith(UserMessageStub),'arguments shoulb be usermessageModel')
    //me aseguro que dependa de un usermodel
    t.true(UserMessageStub.belongsTo.called,'UserMessageModel.belongsTo was execute')
    t.true(UserMessageStub.belongsTo.calledWith(MessageStub),'argument should be MessageModel')

})
test.serial('Message#findById', async t=>{
    //traigo el posta de 
    let message= await db.Message.findById(id)
    //lo compara con la prueba
    t.true(MessageStub.findById.called,'findById should be called on model')//lamada desde el modelo
    t.true(MessageStub.findById.calledOnce,'findById should be called once')//solo debe ser llamada 1 vez
    t.true(MessageStub.findById.calledWith(id),'findById should be called with same id')// tiene que ser el mismo id pasado a la funcion sin modificar
    t.deepEqual(message,messageFixture.findById(id),'should be the same')
})
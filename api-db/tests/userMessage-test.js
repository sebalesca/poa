'use strict'

const test = require('ava')
const proxyquire= require('proxyquire')
const sinon = require('sinon')//global para pruebas
const userMessageFixture= require('./fixtures/userMessage') 
//variable global de la conexion
let config = {
    logging: function(){}
}
let db = null
let UserStub= {
    hasMany:sinon.spy()
}
let MessageStub={
    hasMany:sinon.spy()
}
let UserMessageStub=null
let sandbox=null
let single= Object.assign({},userMessageFixture.single)
let id=1
let uuId='yyy-yyy-yyyu'
let idUser=1
let receiver=1
let messageArgs={
    where:{uuId}
}
let idUserArgs={
    where:{idUser}
}
let receiverArgs={
    where:{receiver}
}
//este hook se ejecuta antes de los test
test.beforeEach(async()=>{
    sandbox= sinon.createSandbox()
    UserMessageStub={
        belongsTo:sandbox.spy()
    }
    //model findAll
    UserMessageStub.findAll= sandbox.stub()
    UserMessageStub.findAll.withArgs().returns(Promise.resolve(userMessageFixture.all))
    UserMessageStub.findAll.withArgs(idUserArgs).returns(Promise.resolve(userMessageFixture.findMessageByUserId(idUser)))
    UserMessageStub.findAll.withArgs(receiverArgs).returns(Promise.resolve(userMessageFixture.findMessageByReceiver(receiver)))
    //model findOne(uuid)
    UserMessageStub.findOne= sandbox.stub()
    UserMessageStub.findOne.withArgs(messageArgs).returns(Promise.resolve(userMessageFixture.findByUuId(uuId)))    
   


    const setupDataBase= proxyquire('../',{
        './models/user':()=>UserStub,
        './models/message':()=>MessageStub,
        './models/userMessage':()=>UserMessageStub
    })
    db = await setupDataBase(config)
})

test('UserMessage',t=>{
    t.truthy(db.UserMessage,'UserMessage should exist')
})
test.serial('setup',t =>{
    t.true(UserMessageStub.belongsTo.called,'UserMessageModel.belogsTo was execute')
    // me aseguro que pase como parametro un usermessage
    t.true(UserMessageStub.belongsTo.calledWith(UserStub),'arguments shoulb be userModel')
    //me aseguro que dependa de un usermodel    
    t.true(UserMessageStub.belongsTo.calledWith(MessageStub),'argument should be MessageModel')

})

 test.serial('UserMessage#findByUuId',async t=>{
    let userMessage= await db.UserMessage.findByUuId(uuId)
    t.true(UserMessageStub.findOne.called,'findByUuId should be called on model')
    t.true(UserMessageStub.findOne.calledOnce,'findByUuId should be called once')
    //t.true(UserMessageStub.findOne.calledWith(uuId),'findByUuId should be called with specific uuid')
    t.deepEqual(userMessage,userMessageFixture.findByUuId(uuId),'should be the same')
})
test.serial('UserMessage#findMessageByUserId',async t=>{
    let userMessage= await db.UserMessage.findMessageByUserId(idUser)
    t.true(UserMessageStub.findAll.called,'findMessageByUserId should be called on model')
    t.true(UserMessageStub.findAll.calledOnce,'findMessageByUserId should be called once')
   // t.true(UserMessageStub.findAll.calledWith(idUser),'findMessageByUserId should be called specific iduser')
    t.deepEqual(userMessage,userMessageFixture.findMessageByUserId(idUser),'should be the same')

})
test.serial('UserMessage#findMessageByReceiver',async t=>{
    let userMessage= await db.UserMessage.findMessageByReceiver(receiver)
    t.true(UserMessageStub.findAll.called,'findMessageByReceiver should be called on model')
    t.true(UserMessageStub.findAll.calledOnce,'findMessageByReceiver should be called once')
   // t.true(UserMessageStub.findAll.calledWith(reciever),'findMessageByReceiver should be called with specific args')
    t.deepEqual(userMessage,userMessageFixture.findMessageByReceiver(receiver),'should be the same')

})

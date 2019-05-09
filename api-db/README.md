``` js
const setupDataBase= require('api-db')
setupDataBase(config).then(db=> {
    const {User,UserMessage,Message}= db
}).catch(err=> console.log(err))
```
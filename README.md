# poa
programacion de objetos avanzadas
## tp1 app Mesanjeria
La app se realizo en Node.js con el framework Express.js para facilitar el desarrollo de la misma.
Se separo en dos proyectos uno denominado **api-db** donde se realizo la capa de acceso y creacion dela base de datos, se uso postgres. Ademas para la creación de la base de datos se uso un ORM llamado sequelize a partir de las clases diseñadas para el sistema. Se realizaron algunos test de prueba unitaria con ava.  Para facilitar el manejo de funciones asíncronas en Express se uso el modulo express-asyncify. Para la seguridad de las peticiones se uso JWT  y espress-jwt para asegurar los endpoint. También se uso el modulo cors para las peticiones externas.
Y las transacciones las maneja sequelize.
El otro modulo se denomino **api-message** que es la *api* propiamente dicha, la cual consume los servicios del modulo api-db. 

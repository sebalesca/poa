# poa
programación de objetos avanzadas
## tp1 app Mesanjeria
La app se realizó en Node.js con el framework Express.js para facilitar el desarrollo de la misma.
Se separó en dos proyectos uno denominado **api-db** donde se realizó la capa de acceso a datos y creación de la base, se usó **postgres**. Además  para la creación de la base de datos se usó un ORM llamado sequelize a partir de las clases diseñadas para el sistema. Se realizaron algunos test de prueba unitaria con ava.  Para facilitar el manejo de funciones asíncronas en Express se usó el módulo express-asyncify. Para la seguridad de las peticiones se usó JWT  y espress-jwt para asegurar los endpoint. También se usó el módulo cors para las peticiones externas.
Y las transacciones las maneja sequelize.
El otro módulo se denominó **api-message** que es la *api* propiamente dicha, la cual consume los servicios del módulo api-db. 
* Instalación de la base de datos: dentro del modulo de **api-db** ejecutar el script: *npm run setup*
* Tener en cuenta se necesita *postgres* para la correcta generación de las tablas 
* Para ejecutar el módulo api-message en desarrollo: *npm run start-dev*
* En ambos casos de deben instalar las dependencias con *npm install* 

##tp2 front
la app se realizo en con vue.js y pug como plantilla, se utilizo webpack para el desarrollo y despliegue de la app
para las peticiones de datos se uso **trae** un modulo de npm hecho por dev argentinos. las interfaces se estilaron 
con bulma.io para acelerar el desarrollo

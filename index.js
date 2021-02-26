/*
app.js: Es el archivo principal y aquí se inicializa todas las variables y los entornos. También se definen los 
archivos que interactuan entre ellos.

/bin/www: Se definen aspectos avanzados de la apliación.

package.json: El archivo donde se define la informació  básica del app y las librerías que utiliza. Necesario 
para un proyecto de NodeJS.

/public: Carpeta con archivos públicos en la web

/routes: Carpeta con archivos donde se definen todas las rutas del app

/views: Carpeta con los archivos de vista
*/

'use strict'
var Connection = require('tedious').Connection;
var app = require('./app');
var port = 3700;

//Creacion del servidor
app.listen(port, () => {
    console.log("Servidor corriendo correctamente en la url: localhost:3700");
});



const { crearArchivo } = require('./helpers/multiplicar'); //Me importo la funcion crearArchivo y uso la desestructuracion
const colors = require('colors');
const argv = require('./config/yargs');

console.clear();

crearArchivo( argv.b, argv.l, argv.h)
  .then( nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
  .catch( err => console.log(err));



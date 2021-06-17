const argv = require('yargs')
    .option('b', {
      alias: 'base',
      type: 'number',
      defaultDescription: true,
      describe: 'Es la base de la tabla de multiplicar'

    })
    .option('l', {
      alias: 'listar',
      type: 'boolean',
      default: false,
      describe: 'Muestra la tabla en consola'

    })
    .option('h', {
      alias: 'hasta',
      type: 'number',
      default: 10,
      describe: 'Este es el número hasta cuando quieres la tabla.'

    })
    .check( (argv, options) => {
      if( isNaN(argv.base) ) {
        throw ' La base tiene que ser un número'
      }
      return true;
    })
    .argv;

module.exports = argv;
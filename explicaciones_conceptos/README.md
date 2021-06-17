# INSTALACIONES NECESARIAS Y RECOMENDACIONES

   * Google Chrome para usar como navegador de internet, voy a usar las herramientas de desarrollo.
   * Visual Studio Code, como editor de código. La extensión recomendada: <br>
    * AntivitusBar
    * Tema: Monokai Night Theme
    * Material Icon Theme, iconos para los archivos
    * TypeScript Importer
    * Bracker Pair Colaraizer 2, en opcion de codigo -> preferencias -> settings -> SETTINGS .JSON -> Y EN LA PARTE DE BRACKET-PAIR-COLORIZER-2.COLORS: se pueden personalizar los colores a: <br>
    ```
    "#fafafa",
    "#9F51B6",
    "#F7C244",
    "#F07850",
    "#9CDD29",
    "#C497D4",
    ```
   * Postman: postman.com, hay que descargarlo. Sirve para probar peticiones HTTP ( queremos saber cómo funciona una API antes de hacer las integraciones en Node, es para chequear los enpoint).
   * MongoDB: MongoDB Compass, bajar la versión estable.
   * GIT: que sea de la versión 2 o superior. Si no lo tenemos, bajarlo y configurar el nombre y el email.
   * Crear cuenta de GitHub.
   * Nodejs

---

# PRIMERAS BASES DE NODE

## ¿POR QUÉ ES TAN POPULAR NODE?

### ¿Qué es Node?

Es **JavaScript del lado dle servidor**, es : <br>
-Lenguaje Back End <br>
-Acceso al sistema de archivos del equipo<br>
-Información del Sistema Operativo<br>
-Procesos del equipo <br>
-Corre sobr eel motor v8 (el que usar Google Chrome, es un engine de JS de alto desempeño, que está escrito en C++ y trabaja trduciendo el lenguaje que escribimos en JS a la máquina)<br>

**¿ Qué puedo hacer con node ?** <br>

Uso de Sockets para una comunicación real Cliente-Servidor <br>
Manejo de archivos en FileSystem, cargas simultáneas. <br>
Servidores locales y remotos con información en tiempo real. <br>
Conexiones a base de datos. <br>
Creación de servicios REST en segundos. <br>

**¿ Por qué es tan popular ?**

-Entradas y salidas no realizan bloqueos del servidor (es no bloqueante). <br>
-Es sumamente rápido y fácil de configurar. <br>
-Más de 470 mil paquetes disponibles (el ecosistema con más librerías en el mundo). <br>
-Si sabes JS ya sabés la mayor parte de Node.<br>

**¿ Quiénes la usan?** <br>
Netflix, Paypal, LinkedIn, Walmart, Uber, ebay, NASA <br>

Node.js es a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js'package ecosystem, npm, is the largest ecosystem of open spurce libraries in the world. <br>

## ¿ QUÉ EL BLOCKING Y NON-BLOCKING I/O ?

Tengo un archivo: app-blocking.js
```
const ( getUsuarioSync ) = require('./usuarios/usuarios');

console.log('Inicio de programa');
console.log('Inicio');

const usuarios = getUsuarioSync( 1 );
console.log('Usuario 1:', usuario1);

const usuarios = getUsuarioSync( 2 );
console.log('Usuario 2:', usuario2);

console.log('Fin de programa');
console.log('Inicio');
```
Y se me va a imprimir: 
```
Inicio de programa
Usuario 1: (id: 1, nombre: 'Usuario 1')
Usuario 2: (id: 2, nombre: 'Usuario 2')
Fin de programa
```
Y tengo el archivo app-non-blocking.js
```
const ( getUsuario) = require('./usuarios/usuarios');

console.log('Inicio de programa');
console.log('Inicio');

getUsuario( 1, ( usuario) => {
   console.log('Usuario 1:', usuario1);
});


getUsuario( 2, ( usuario) => {
   console.log('Usuario 2:', usuario2);
});

console.log('Fin de programa');
console.log('Inicio');
```
En este caso son funciones no bloqueantes, funciones que reciben un número como primer argumento y el segundo argumento es un callback (una función). <br>
Y se va a imprimir:
```
Inicio de programa
Fin de programa
Usuario 1: (id: 1, nombre: 'Usuario 1')
Usuario 2: (id: 2, nombre: 'Usuario 2')
```
Y en mi archivo usuarios.js, tengo:
```
const getUsuarioSync = ( id) => {
   const startPoint = new Date().getTime();
   while (new Date().getTime() - startPoint <= 3000 ) {
      //Esperando...
      //Haciendo fetch de base de datos...
      //Robanod datos de facebook...
   }

   return {
      id,
      nombre: `Usuario ${id}`
   };
}

const getUsuario = (id, callback) => {
   const usuario = {
      id,
      nombre: `Usuario ${id}`
   };

   setTimeout ( () => {
      callback( usuario);
   }, 3000);
}

module.exports = {
   getUsuario,
   getUsuarioSync
}
```
Que me imprime lo mismo que el anterior, pero más rápido porque tiene dos peticiones no bloqueantes y ejecuta todo en el mismo hilo de tiempo.
```
Inicio de programa
Fin de programa
Usuario 1: (id: 1, nombre: 'Usuario 1')
Usuario 2: (id: 2, nombre: 'Usuario 2')
```

## REALIZAR EL PRIMER PROGRAMA CON NODE

En esta misma carpeta están los archivos: <br>
**app.js** con el Hola Mundo y unas variables que mando a consola con console.log <br>
**app2.js** donde uso una arrow function asignada a una constante. <br>
**app3.js** <br>

## COMPRENDER COMO ES QUE NODE RESUELVE LOS PROCESOS SINCRÓNICOS Y ASINCRÓNICOS

Lo vemos en el arvhico **app3.js**

## COMPRENDER EL CICLO DE VIDA DE UN PROCESO EN NODE
```
let nombre = 'Eugenia';
console.log(`Hola ${ nombre}`);
let a = 10;
let b = 20;
console.log(a + b);
```
Lo primero que hace Node en su **Call Stack ( Pila de procesos )** es crear su función main(), la primera que se ejecuta, toma la primer línea del cñodigo, lo pone en la pila, lo ejecuta y lo elimina. Y asi va línea por línea del código. <br>
Cuando termina la pila de procesos, termina el main, terminó la aplicación. <br>
También tenemos a **Node Apis** y **Cola de callbacks** que en este ejemplo no los utilizamos. <br>

---

Ahora tenemos el segundo ejemplo:
```
function saludar ( nombre) {
   let mansaje = ` Hola ${nombre}`
   return mensaje;
}

let saludo = saludar('Eugenia);
console.log(saludo);
```
Primero Node crea el main y comienza a ejecutar el código. <br>
Primero registra la función saludar. <br>
```
function saludar ( nombre) {
```
Luego pasa a la línea de la variable saludo que llama a la función saludar().<br>
```
let saludo = saludar('Eugenia);
```
 y entonces entra al bloque de código dentro de la función: <br>
 ```
 let mansaje = ` Hola ${nombre}`
 ```
 Y retorna el mensaje. <br>
 Acá la función termina y se quita de la pila e procesos. <br>
 Pasa a la última línea de código:
 ```
 console.log(saludo);
 ```
 Se ejecuta, se elimina de la pila de procesos. Se elimina el main y finaliza mi aplicación. <br>

---

Ahora el tercer ejemplo:

```
console.log('Inicio de programa');

setTimeout( () => {
  console.log('Primer Timeout')
}, 3000);

setTimeout( () => {
  console.log('Segundo Timeout')
}, 0);

setTimeout( () => {
  console.log('Tercer Timeout')
}, 0);

console.log('Fin de programa');
```
Primero crea el main() en mi pila e procesos <br>
Ejecuta la primera línea del programa: <br>
```
console.log('Inicio de programa');
```
La ejecuta y la quita de ahí. <br>
Luego toma el <br>
```
setTimeout( () => {
  console.log('Primer Timeout')
}, 3000);

```
Y lo guarda, porque se debe de ejecutar en 3 segundos. Es la primer tarea **asíoncrona**, la registra pero no la ejecuta, porque todavía no está resuelta. La coloca en la caja de **Node Apis** donde Node está pendiente de los procesos, espera respuestas, espera que terminen tareas asíncronas. <br>
Luego registra el segundo setTimeout: <br>
```
setTimeout( () => {
  console.log('Segundo Timeout')
}, 0);
```
Ejecuta el segundo setTimeout, pasa a Node Apis.<br>
Luego viene el tercer setTimeout. <br>

```
setTimeout( () => {
  console.log('Segundo Timeout')
}, 0);
```
Llega, lo registra y lo manda a Node Apis, y lo pasa a la Pila de Callbacks (todos los procesos que están listos para ser ejecutados, pero esperan primeor que la pila de procesos finalice).<br>
Y finalmente a nuestra función main, llega: <br>
```
console.log('Fin de programa');
```
Como no es tarea asíncrona, la recibe, la ejecuta y listo, el main termina. <br>
Pero la aplicación sigue teniendo procesos en cola (de call backs).<br>
El segundo setTimeout ya terminó, es el que primero termina, entonces pasa a la pila de procesos, lo ejecuta y elimina. <br>
Luego ejecuta el tercer setTimeout y lo elimina.<br>
Una vez que pasaron los 3 segundos el primer setTimeout pasa a la cola de call backs, luego es detectado, pasado a la pila de procesos, lo ejecuta, lo elimina, y ahí si ya finalizó todo. <br>

La cola de call back se va ejecutando conforme va llegando, el primero que llega es el primero que sale. <br>

---

## Nodemon

Solo sirve en desarrollo, no lo usamos en producción.<br>
En npm buscamos **nodemon**. <br>
Vamos a instalarlo de manera global:
```
npm install -g nodemon
```
**-g** significa que hay que ejecutar este comando como administrador o super usuario. En windows abrir Power Shell como adminsitrador si estás en Windows. <br>
Para desisnstalar
```
npm uninstall -g nodemon
```
Para ver que esté instalado:
```
C:\>nodemon --version
2.0.7
```
Veo que tengo la version 2.0.7 <br>
Lo hice por CDN, porque con Power Shell no veia la versión. <br>
Ahora en mi consola en vez de poner **node nombredelarchivo** voy a poner **nodemon nombredelarchivo** <br>
Para cancelar el proceso: **Ctrl + C** <br>
Para estar en el escritorio donde tengo mi carpeta: <br>
```
C:\Users\juan\Desktop
```
Y con el comando **cd** dejo un espacio y voy indicando a donde voy, la ruta de nombre de carpeta y luego archivo. <br>

---

# BASES DE NODE

Creo la carpeta **bases-node** y dentro el archivo **app.js** (otra forma de poder llamarlo es index.js.) <br>

```
// Imprimir la tabla del 5 en consola
const base = 5;

for (let i = 1; i <= 10; i++) {
  console.log(` ${ base } x ${ i } = ${ base * i} `); [i];
}
```
Por consola voy a ver: <br>
```
 5 x 1 = 5 
 5 x 2 = 10 
 5 x 3 = 15
 5 x 4 = 20
 5 x 5 = 25
 5 x 6 = 30
 5 x 7 = 35
 5 x 8 = 40
 5 x 9 = 45
 5 x 10 = 50
```
Si ahora en la primer línea de código agrego: 
```
console.clear();
```
Al ejecutar por consola nuevamente mi archivo de **node app** la consola se limpia . <br>
Ahora comento el **console.clear()** y agrego justo antes de mi for para imprimir la tabla de multiplicar del 5: <br>
```
console.log('===================');
console.log(`   Tabla del 5 :`);
console.log('==================');
```

## Requerir información de otros archivos

## Requerir paquetes

Con Node tenemos control en el Back End donde estamos ejecutando, por lo que podemos grabar archivos, mover archivos, eliminar directorios, hacer muchas cosas en nuestra computadora o donde esté corriendo la aplicación de Node. <br>
En este caso quiero imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la misma ruta que mi aplicación. <br>
Tengo que ver de qué manera puedo tener acceso al **File System** de JavaScript. No lo puedo hacer directamente desde el navegador.<br>
Voy a la web de **Node** a la sección de **Documentación**, en la **tabla de contenidos** donde está la lista de todo lo que ya tiene Node, ahi tenemos **File System** y veo la lista de métodos y propiedades, hay algunos que me indica que ya están deprecados. Busco : <br>
**fs.writeFile( file, data[, options], callback)** y si veo en el link, tengo toda la documentación que me aclara: <br>
file <string> | <Buffer> | <URL> | <integer> filename or file descriptor <br>
data <string> | <Buffer> | <TypedArray> | <DataView> | <Object> <br>
options <Object> | <string> <br>
    * encoding <string> | <null> Default: 'utf8'
    * mode <integer> Default: 0o666
    * flag <string> See support of file system flags.Default: 'w'.
    *signal <AbortSignal> allows aborting an in-progress writeFile
callback <Function><br>
    * err <Error> | <AggregateError>

 **fs.writeSync(fd, buffer[, offset[, length[, position]]])**  <br>
 **fs.writeSync(fd, string[, position[, encoding]])** <br>
 **fs.writevSync(fd, buffers[, position])** <br>

Vuelvo a mi archivo **app.js** de la tabla de multiplicar: <br>
```
//console.clear();  para limpiar la consola
// fs = file system para importar el file system
const fs = require('fs');

console.log('===================');
console.log(`   Tabla del 5 :`);
console.log('==================');
// Imprimir la tabla del 5 en consola
const base = 5;
let salida = '';

for (let i = 1; i <= 10; i++) {
  salida +=  ` ${ base } x ${ i } = ${ base * i}\n `;
}
//Si a .writefile() no le indico el path me toma el de la carpeta en la que estoy
fs.writeFile( 'tabla-5.txt', salida, (err) => {
  if(err) throw err;

  console.log('tabla-5.txt creado');
});
// console.log(salida);  para ver que en la constante salida guardo todo lo que necesito, es decir la tabla de multiplicar del 5
```
Lo corro en consola, y si veo en la carpeta tengo el archivo .txt con la tabla de multiplicar. <br>
Es información que está en la computadora, es persistente, porque se grabó en disco. <br>
Y justo al finalizar el for, agrego: <br>
```
console.log(salida);
```
Para tener también la salida por consola. <br>
Entonces veo toda la tabla del 5 y además el texto que me indica que el archivo se creo. <br>
Si necesitaría la tabla de otro número, cambio el valor de la base por el numero del que necesito la tabla. <br>
Se van a hacer los cálculos bien, porque está todo referenciado a una varaible, peor el nombre dle archivo va a salir mal, porque va a seguir diciendo 5. Entonces cambiamos por back ticks y reemplazamos el 5 por la variable <br>
```
fs.writeFile( `tabla-${base}.txt`, salida, (err) => {
  if(err) throw err;

  console.log(`tabla-${base}.txt creado`);
});
```
Cambio el valor de mi variable **base** a **3**, corro el archivo en consola, veo la tabla del 3 y también tengo creado mi nuevo archivo .txt con la tabla del 3. <br>


## Importar archivos
Tenemos que dejar lo más limpio posible el archivo app.js o index.js, tenemos que ir separando en archivos. <br>
Me creo la carpeta **helpers** <br> y dentro de helpers me creo un archivo que se llama **multiplicar.js** <br>
Lo que voy a hacer es llevar parte del código a mi nuevo archivo multiplicar.js, pero antes voy a cambiar el .writeFile() por .writeFileSync(). <br>
```
fs.writeFileSync( `tabla-${base}.txt`, salida );
```
Entonces se va a ejecutar de manera asíncrona. Y para que se vea en consola. <br>
```
console.log(`tabla-${base}.txt creado`);
```
Entonces en mi archivo **multiplicar.js** tengo:
```
const crearArchivo = ( base  = 1 ) => {

  console.log('===================');
  console.log('Tabla del: ', base);
  console.log('==================');

  let salida = '';

  for (let i = 1; i <= 10; i++) {
    salida +=  ` ${ base } x ${ i } = ${ base * i}\n `;
  }
  console.log(salida);

  fs.writeFileSync( `tabla-${base}.txt`, salida );

  
  console.log(`tabla-${base}.txt creado`);

}
```
Ahora lo necesito ajectutar desde mi archivo app.js, que al momento me queda:
```
console.clear(); //para limpiar la consola

const fs = require('fs');

const base = 2;
```
Primero tengo que permitir que se exporte mi función grardada en la variable desde multiplicar.js: <br>
```
//Acá lo importo
module.exports =  {
  crearArchivo // crearArchivo : crearArchivo
}
```
Y al inicio debo tener:
```
const fs = require('fs');
```
En mi app.js:
```
console.clear();
const { crearArchivo } = require('./helpers/multiplicar');
const base = 2;
crearArchivo( base );
```
Y si corro en consola el archivo app.js voy a ver la tabla del 2, porque a mi varaibla base le di vlor 2 en app.js. <br>
Necesito que mi función crearArchivo me avise si se creo bien o si tuve algún error. <br>
Tewngo que transformar la función crearArchivo en una promesa. <br>
Entonces en mi archivo multiplicar.js <br>
```
const crearArchivo = ( base  = 1 ) => {

  return new Promise( (resolve, reject) => {

    console.log('===================');
    console.log('Tabla del: ', base);
    console.log('==================');

    let salida = '';

    for (let i = 1; i <= 10; i++) {
      salida +=  ` ${ base } x ${ i } = ${ base * i}\n `;
    }
    console.log(salida);

    fs.writeFileSync( `tabla-${base}.txt`, salida );

    resolve(`tabla-${base}.txt`);

  })

}
```
Y al final en mi app.js: <br>
```
crearArchivo( base )
  .then( nombreArchivo => console.log(nombreArchivo, 'creado'))
  .catch( err => console.log(err));
```  
Funciona, pero de este modo no estoy tratando el reject, etonces veo otra forma mejor.  Entonces en mi archivo multiplicar.js< y manejo el error con try catch <br>
```
const crearArchivo = async( base = 5) => {

    try {

      console.log('===================');
      console.log('Tabla del: ', base);
      console.log('==================');

      let salida = '';

      for (let i = 1; i <= 10; i++) {
        salida +=  ` ${ base } x ${ i } = ${ base * i}\n `;
      }
      console.log(salida);

      fs.writeFileSync( `tabla-${base}.txt`, salida );

      return `tabla-${base}.txt creado`;

    } catch (err) {
      throw err;
    }

}
```

---

## REcibir información desde línea de comandos

```
nodemon --version
```
Con **-- version** corroboro que esté instalado y veo qué versión tengo. En este caso sabe que no quiero que se ejecute nodemon, isno que quiero saber qué versión tengo instalada. <br>
```
node app
```
En este caso ejecutamos el comando de **node** .<br>
En nuestra app deberíamos poder hacer: **node app --version** y tener la versión de mi aplicación. <br>
También poder hacer **node app --base** para informar en qué base quiero trabajar (para saber la tabla de qué numero necesito). Inclusive le puedo poner un límite: **node app --base=100 --limite=20**. <br>

En mi archivo app.js comento la parte de la creación del archivo, y agrego:
```
console.log(process.argv); 
```
Si ejecuto por consola node app, tengo 2 argumentos: <br>
-el path donde se encuentra nuestra aplicación de node  instalada de manera global<br>
-donde se encuetra ejecutada la aplicación que hice <br>
Y si pongo por consola: **node app --base=5**, voy a ver un tercer argumento: **base=5**, este argumento ahora lo puedo utilizar. <br>
Tengo que extraer esta base. <br>
Entonces en app.js: <br>
```
//creo una constante y voy a desestructurar en el array la base
const [, , arg3='base=5'] = process.argv;
console.log(arg3); 
```
Y si por consola tengo **node app --5** veo la base, pero si solo ejecuto **node app** me da undefined. Entonces aprovecho la desestructuración para ponerle un valor por defecto: **base=5**. <br>
Entoces si ahora en comando ejecuto: **node app** tengo <br>
```
base=5
```
Y si lo mando con la base, **node app --5** voy a tener: <br>
```
--base=5
```
Entonces en mi app.js: <br>
```
//creo una constante y voy a desestructurar en el array la base
const [, , arg3='base=5'] = process.argv;
const [ , base] = arg3.split('='); 
//con el split lo separo en base y en 5, lo que me interesa es tener el segundo que es la nueva base
console.log(base);
```
Y en la consola: **node app --base=5** y voy a ver: **5** . El inconveniente es que si no ponen nada da undefined, entonces establezco un valor por defecto: **const [ , base = 5 ] = arg3.split('=');**. Entonces si ahora en consola tengo **node app --base** voy a ver el **5**.  <br>
Descomento mi función **crearArchivo()**.<br>
Y ahora si cuando pongo en consola: **node app --base=/aca_ingreso_un_numero/** voy a ver la tabla del número indicado. Se me crea y la tengo en el archivo .txt. <br>
Pero en realidad crearlo de esta forma:
```
const [, , arg3='base=5'] = process.argv;
const [ , base = 5 ] = arg3.split('='); 
```
Va a traer inconvenientes, no es la mejor opción. Fue solo a fines educativos y para ver de dónde vienen los argumentos que vienen a la hora de ejecutar un comando por consola. <br>
Tenemos el inconveniente que no a a tomar los números por posición, sino por la base, entonces si por consola indico base y limite no me lo va a reflejar bien. <br>
Tampoco puedo por comando indicar la base sin el =, porque al no encontrarlo no puede hacer el split ya que no tiene el =.<br>
También estaría buenísimo tener un paquete que nos sirva para manejar los argumentos de lo caonsola y sea como una ayuda, tenemos muchas reglas de validación que acá no la usamos. Pero al momento sabemos como ver y recibir los argumentos que vienen por consola. <br>


---

## Requerir paquetes

**package.json - init - install - uninstall**

## Importar archivos personalizados


## NPM

**NPM = NODE PACKAGE MANAGER** <br>
Desde mediados de 2019 ya hay más de 1 millón de paquetes. <br>
Pero se suele trabajar con 20 o 50 máximo, lo ideal es trabajar con paquetes que tiene muchas descargas semanales, para saber si es de confianza. <br>

¿Cómo lo instalo? <br>
¿Cómo le digo a mi aplicación que lo debe instalar? <br>
Ahora tengo que ocupar **paquetes de terceros** por lo que debo prepararme para recibirlos. <br>
Vamos a crear el **package.json**. <br>
Estando en línea de comando situada en mi directorio **bases-node**: <br>
```
npm init 
```
Voy a ver cierta información y al final: <br>
```
package name: (bases-node)
```
Por defecto en el nombre de mi paquete tengo el mismo nombre que mi directorio. Se puede dejar este nombre a cambiarle al que queramos del proyecto. Dejo ese mismo y enter.<br>
```
version: (1.0.0)
```
Ahora tengo la versión. Me trae por defecto: **1.0.0** que sigue los standares del semantic version. como es una versión de desarrollo, le voy a poner: **0.0.1**  <br>
```
version: (1.0.0) 0.0.1
```
Y ahora tengo: **description:** y completo la descripción: **Es uan simple tabla de multiplicar con archivo de texto** <br>
```
description:  Es una simple tabla de multiplicar con archivo de texto
```
Y ahora me pide: **entry point: (app.js)** que es el punto de inicio, por default sugiere el app.js <br>
Lo dejo así. <br>
Y luego tengo: **test command:** , el comando que se puede ejecutar par hacer pruebas unitarias. Por ahora lo dejo así.<br>
Luego tengo **git repository:**como todavía no lo tengo lo dejo así, sin repositorio. Todos estos datos son lo que se ven, si yo luego publicaría mi paquete, como cuando busque el paquete de colores, que hacia la derecha tenía esta información pero de su paquete.<br>
Ahora veo: **keywords:** , para ayudar al subir la aplicaión en npm, que puede escribir para buscar el paquete, en este caaso no voy a poner nada. <br>
Luego me pide **author:**, pongo mi nombre. <br>
Me pide: **license:(ISC)**, yo la dejo vacía, podes poner MIT; o lo que deseas. <br>
Pregunta si está ok? (yes) <br>
Entonces **enter** para que lo cree. <br>

Si veo ahora en mi proyecto voy a ver el archivo **package.json** con todos los datos que ingresé: <br>
```
{
  "name": "bases-node",
  "version": "0.0.1",
  "description": " Es una simple tabla de multiplicar con archivo de texto",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Maria Eugenia Costa",
  "license": "ISC"
}
```
Ahí mismo si luego quiero cambiar la versión lo modifico desde ahí, si luego agrego repositorio en GitHub también lo agrego.
---

## Package.json

¿Qué es? <br>
¿Para qué nos sirve? <br>
El **package.jason** es el punto inicial de cualquier proyecto de Node.js, nos ayuda a nosotros y a Node a saber qué comandos se ejecutan para ajecutar la aplicación. Por ejemplo: <br>
```
"script": {
  "test": "echo\"Error: no test specified\" && exit 1
},
```
Entonces me podría tomar el comando de node app --base=3 y podría crear un script. <br>
```
"script": {
  "test": "echo\"Error: no test specified\" && exit 1,
  "base3": "node app --base=3" 
},
```
Entonces ahora sí, en mi línea de comandos lo puedo ejecutar: <br>
```
npm run base3
```
Y voy a tener la tabla del 3. <br>

---

## Yargs

Es un paquete muy popular, utilizado por muchas librarías, tieen muchas descargas semanales. A veces alguien usa algún paquete que tiene como dependencia a Yargs y también cuenta como descarga. <br>
Lo instalo con:
```
npm i yargs
```
En mi app.js: <br>
```
const argv = require('yargs').argv;
console.clear();

console.log(process.argv);
console.log(argv);
```
Y por consola tengo : <br>
```
{ _: [], '$0': 'app' }
```
Ahora también por consola: <br>
```
node app base=5
```
Y voy a ver: <br>
```
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\juan\\Desktop\\nodepilis2\\bases-node\\app',
  'base=5'
]
{ _: [ 'base=5' ], '$0': 'app' }
```
En los procesos lo agregó como un string, como un tercer argumento.<br>
Lee que viene la base 5, crea un **objeto** que es mucho más fácil de acceder a el porque lo puede usar por nombre y también le puso el valor de 5.<br>
Gracias a eto ya no necesito hacer un **split**, no necesito cortar.<br>
Entonces en mi app.js:
```
console.log('base: yargs', argv.base ); 
```
Vuelvo a ejecutar: **node app base=5** en mi consola y además de lo que me vino mostrando, tengo : <br>
```
base: yargs 5
```
Y si mando por comando: **node app base 5**: <br>
```
{ _: [ 'base', 5 ], '$0': 'app' }
base: yargs 5
```
Pero arriba en el [] tenemos dos argumentos: **'--base'** y **'5'** y es dificil saber que despues de la base viene el argumento. <br>
Si ahora necesito otra bandera, como por ejemplo: **--listar** (**node app base 5 --listar**), voy a tener otro argmento más: **'--listar'** y me lo crear como **true**: **{ _: [ 'base', 5 ], listar: true, '$0': 'app' }**.<br>
Si en vez de --listar mando como bandera **--l** es igual, también tengo el nuevo argumento '--l' y lo pasa en {} como true. Esto es muy útil para una versión corta de una bandera (como abreviatura).  Por ejemplo si uso la bandera **--b** quiero que sea la abreviatura de **--base**, pero todavía no funciona, porque Yargs no sabe que **b** significa que es la **base**. Esto se puede personalizar en Yargs. <br>

¿ Qué otra cosa hace Yargs, sin tener que configurar? <br>
```
node app --help
```
Y tengo ayuda: <br>
```
Opciones:
 --help     Muestra ayuda                 [booleano]  
 --version  Muestra número de versión     [booleano]PS
```
Entonces si quiero ver la version: **node app --version** y tengo: **0.0.1**, es la versión del package.json, es la versión de nuestra aplicación.<br>
Es un standard que la bandera **--help** es de ayuda para listar los comandos de mi aplicación. <br>

## Documentación oficial de Yargs

https://yargs.org <br>

## Configuración de Yargs

## Recibir parámetros por línea de comando

En app.js: <br>
```
const argv = require('yargs')
              .option('b', {
                alias: 'base',
                type: 'number'
              })
              .argv;
```
Nuevamente **node app --help** : <br>
```
Opciones:
      --help     Muestra ayuda                              [booleano]
      --version  Muestra número de versión                  [booleano]
  -b, --base                                                [número]
```  

Y ahora tengo la nueva opción **-b,** que es la abreviación de **--base** y en mi app.js paso a comentar: <br>
//console.log( process.argv ); <br>
Pero quiero mandar **node app --base=5** y Yarg me establece que puedo usar b y base, que son igual, se pueden usar indistintamente. <br>
```
node app --base=5
{ _: [], base: 5, b: 5, '$0': 'app' }
base: yargs 5
```
Y con: <br>
```
node app --b 5
{ _: [], base: 5, b: 5, '$0': 'app' }
base: yargs 5
```
Para chequear que solo ingrese números, en app.js: <br>
```
.check( (argv, options) => {
                if( isNaN(argv.base) ) {
                  throw ' La base tiene que ser un número'
                }
                return true;
              })
```
Y vuelvo a descomentar, para tener:
```
crearArchivo( argv.base)
  .then( nombreArchivo => console.log(nombreArchivo, 'creado'))
  .catch( err => console.log(err));
```  
Entonces si mando: **node app --b 6** me crea la tabla del 6. <br>

Ahora en mi app.js creo la opcion l / listar: <br>
```
 .option('l', {
                alias: 'listar',
                type: 'boolean',
                defaultDescription: true,
                default: false

              })
```
Y lo agrego como argumento: **crearArchivo( argv.base, argv.listar)** <br>
Y modifico mi funcion en multiplica.js: <br>
```

const crearArchivo = async( base = 5, listar = false ) => {

    try {


      let salida = '';

      for (let i = 1; i <= 10; i++) {
        salida +=  ` ${ base } x ${ i } = ${ base * i}\n `;
      }

      if( listar ) {
        console.log('===================');
        console.log('Tabla del: ', base);
        console.log('==================');
        console.log(salida);
      }

      fs.writeFileSync( `tabla-${base}.txt`, salida );

      return `tabla-${base}.txt creado`;

    } catch (err) {
      throw err;
    }

}
``` 
Entonces mediante argumentos controlo las cosas que tengo en mi aplicación.             

## Configuración de Yargs independientemente

Quiero separar la lógica de Yargs en un archivo independiente. <br>
Me creo un nuevo directorio llamado **config**, hay personas que lo nombran como **yargs** también. <br>
Y dentro me creo un nuevo archivo llamado **yargs.js** que va a ser mi configuración de yargs. <br>
Entonces de app saco.js el codigo  lo paso a yargs.js: <br>
```
const argv = require('yargs')
    .option('b', {
      alias: 'base',
      type: 'number',
      defaultDescription: true

    })
    .option('l', {
      alias: 'listar',
      type: 'boolean',
      defaultDescription: true,
      default: false

    })
    .check( (argv, options) => {
      if( isNaN(argv.base) ) {
        throw ' La base tiene que ser un número'
      }
      return true;
    })
    .argv;
```   
Pero ahora en app.js, si yo quiero ejecutar: <br>
```
crearArchivo( argv.base, argv.listar)
  .then( nombreArchivo => console.log(nombreArchivo, 'creado'))
  .catch( err => console.log(err));
```
Me va a dar error , porque argv no existe en este scoope, entonces tengo que exportarlo. Entonces en yargs.js: <br>
```
module.exports = argvs;
```
Y ahora tengo que importarlo en app.js: <br>
```
const argv = require('./config/yargs');
```
Ahora quiero que cuando hago: **node app --help** y me lista la ayuda, en las que yo cree me de una mini descripción, como tiene help y version. <br>
Entonces agrego **describe**: <br>
```
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
```    
Voy a agregar una nueva opción de comando: 
```
 .option('h', {
      alias: 'hasta',
      type: 'number',
      default: 10,
      describe: 'Este es el número hasta cuando quieres la tabla.'

    })
```    
Voy a multiplicar.js y agrego como parámetro de la función guardada en la constante: <br>
```
const crearArchivo = async( base = 5, listar = false, hasta = 10 )
```
Reemplazo el 10 de la condición del for por el hasta: <br>
```
for (let i = 1; i <= hasta; i++)
```
Y en app.js también debo agregarlo como argumento: <br>
```
crearArchivo( argv.b, argv.l, argv.h)
```


---

## Colores para la consola 

Se pueden hacer muchas cosas: poner colores, arco iris, subrayados, hacer transformación, color de fondo (como resaltado), para que las respuestas tengan algo más personalizado. <br>
En app.js: <br>
```
const colors = require('colors');
```
Y agrego el color rainbow:
```
crearArchivo( argv.base, argv.listar)
  .then( nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
  .catch( err => console.log(err));
```
Y en multiplicar.js <br>
```
const colors = require('colors');
```
Y agrego color:
```
for (let i = 1; i <= 10; i++) {
        salida +=  ` ${ base } ${'x'.green} ${ i } ${'='.green} ${ base * i}\n `;
      }

      if( listar ) {
        console.log('==================='.green);
        console.log('Tabla del: '.green , colors.blue(base) );
        console.log('=================='.green);
        console.log(salida);
      }
```

Está el inconveneinte, al agregarle el color, cuando me arma el archivo .txt me duplica todo. <br>
Entonces en mi archivo multiplicar.js agrego la variable: **let consola = '';** <br>
Y modifico el for, para tener por in lado la salida y por el otro la consola: <br>
```
  for (let i = 1; i <= hasta; i++) {
        salida +=  ` ${ base }  x  ${ i } = ${ base * i}\n `;
        consola +=  ` ${ base } ${'x'.green} ${ i } ${'='.green} ${ base * i}\n `;
      }
```
Y si se tiene que listar, que sea por consola: <br>
```
 if( listar ) {
        console.log('==================='.green);
        console.log('Tabla del: '.green , colors.blue(base) );
        console.log('=================='.green);
        console.log(consola);
      }
```
Entonces si por ejemplo ahora paso por consola: <br>
```
node app -b 3 -l --hasta=20
```
Voy a ver : <br>
```
===================
Tabla del:  3
==================
 3 x 1 = 3
  3 x 2 = 6
  3 x 3 = 9
  3 x 4 = 12
  3 x 5 = 15
  3 x 6 = 18
  3 x 7 = 21
  3 x 8 = 24
  3 x 9 = 27
  3 x 10 = 30
  3 x 11 = 33
  3 x 12 = 36
  3 x 13 = 39
  3 x 14 = 42
  3 x 15 = 45
  3 x 16 = 48
  3 x 17 = 51
  3 x 18 = 54
  3 x 19 = 57
  3 x 20 = 60

tabla-3.txt creado creado
```
---
## Mejoras en la aplicación

Yo quiero que todos los archivos .txt que se vayan creando se guarden en un directorio específico. Entonces en la raíz creo un directorio llamado **salida** . <br>
Y en multiplicar.js, cambio a donde quiero que se guarden los archivos creados: <br>
```
 fs.writeFileSync( `./salida/tabla-${base}.txt`, salida );
```

--- 

## .gitignore

Es el archivo que va a detallar que archivos debe ignorar git. <br>
Solo me interesa el directorio, no los archivos internos, porque es un producto de un usuario, que se pueden luego borrar. <br>
Necesito mantener la carpeta **salida**, lo que quiero eliminar es su contenido. Entonces ignoro todos los archivos .txt: <br>
```
/salida/*.txt
```
Y siempre se recomienda que el directorio tenga al menos un archivo que no se ignore, entonces creo el archivo **info.md**, hay gente que lo denomina **.keep** como para aclarar que lo mantinen. <br>
Otra cosa que voy a ignorar son los módulos de Node, ya que mi app no necesita todos estos módulos a los cuales no les voy a dar mantenimiento. <br>
Entonces en **.gitignore** agrego: <br>
```
node_modules/
```
Los puedo ignorar porque en packege-lock.json y en package.json tengo que es lo que use y en que versión, por si el día de mañana alguien lo precisa, sabe que modulos debe usar. <br>
Y con el siguiente comando se pueden reconstruir
```
npm i
```
o:
```
npm install
```

---


## Git

Se pueden recostruir mediante un procedimiento. <br>
Ahora para inicializarlo vuelvo a la consola y ejecuto el comando: **git init** <br>
Me dice que el proyecto se inicializó, y veo que el archivo .tzt y node_modules están en gris, esto indica que están ignorados ppor Git. <br>
Para preparar todos los archivos y tomar una fotografía: **git add .** <br>
Ahora tomamos la fotografía con : **git commit -m 'primer commit'**.<br>
Ahora está todo respaldado. <br>
Si el día de mañana se me borra algo por accidente, puedo hacer: **git checkout -- .** y se me retaura todo, ya que Git le da seguimiento, y lo guarda de manera local. <br>
Y si lo desplegamos en GitHub, no hay ningún problema que lo pierda, porque lo tengo guardado en mi GitHub. <br>

Voy a **GitHub** y me creo un nuevo repositorio. Lo creo y le doy una descripcion, lo dejo público y creo el repositorio. <br>
Ya tenemos el **git init** y el **git add .** , ahora usamos el nombre main en vez de master. <br>
Y está la opción de hacer un push con un repositorio ya inicializado. <br>
Me copio el código, lo ejecuto en consola, y voy a tener hecho el push y tengo mi proyecto en GitHub. <br>
```
git remote add origin https://github.com/eugenia1984/nodejs-pilis2.git
git branch -M main
git push -u origin main
```

---

## Install / Uninstall

Vamos a utilizar un paquete de colores en nuestra aplicación, en la terminal integrada de VSC con : <br>
```
npm instal colors
```
Y voy a ver  en mi **package.json** voy a ver que me creo: <br>
```
 "dependencies": {
    "colors": "^1.4.0"
  }
```
Esta parte de las dependencias (paquetes necesarios para que se ejecute la aplicación, si no la tengo no puedo usar el paquete de color.) <br>  
Y también tengo un nuevo archivo: **package-lock.json** donde veo cómo fueron contruidas las dependencias o cómo se deben construir las dependencias que están en el package.json, NUNCa se debe modificar esto directamente.<br>
Luego tengo los **node_modules** que tenemos **colors** <br>
Si por ejemplo queremos instalas **nodemon**, pero no lo quiero instalar como una dependencia, lo voy a usar solo para desarrollo, entonces le agrego al bandera : **--save-dev**
```
npm install nodemon --save-dev
```
Y en mi **package.jnos** veo las dependencias de desarrollo, que solo son necesarias cuando estoy editando mi aplicación:
```
 "devDependencies": {
    "nodemon": "^2.0.7"
  }
```
NUNCA debo MANIPULAR nada de los MODULOS DE NODE (**node_modules**) <br>

Si quisieramos desisntalar nodemoon: <br>
```
npm uninstall nodemon 
```
Y así se nos borra la dependencia. <br>

Ahora suponemos que quiero una versión anterior de color, primero tengo que desisntalar la que ya tengo: <br>
```
npm uninstall colors
```
Y ahora si instaló una versión específica los hago con el @ e indico que versión necesito: <br>
```
npm install colors@1.0.0 
```
Y si quiero actualizarla, es con el comando: <br>
```
npm update
```
Que revisa mis dependencias y me avisa que actualizaciones tengo de mis dependencias, y me avisa si puedo llegar a tener algún conflicto.
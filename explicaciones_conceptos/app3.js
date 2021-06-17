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

/*
Y me imprime:
Inicio de programa
Fin de programa
//Aca pasan los segundos
Segundo Timeout
Tercer Timeout
Primer Timeout 
//Es todo código síncrono, no bloqueante
//JS y Nodejs pone a los callback a la pila de ejecución, pasa a un stack de procedimientos, entra el setTimeOut primero, que debe esperar 3 segundos para ejecutarse, también entran los setTimeOut Segundo y Tercero, que al no tener que esperar para ejecutarse entran y salen, y al final luego de los 3 segundos sale el Primer setTimeOut
*/
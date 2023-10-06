//RESERVAS 

//Array de objetos
const servicios = [
    { servicio: 'gimnasio', precio: 200 },
    { servicio: 'spa', precio: 400 },
    { servicio: 'clases de Surf', precio: 600 }
];

class Habitacion {
    constructor(numero, capacidad, disponible) {
        this.numero = numero; //Numero de la habitacion
        this.capacidad = capacidad; // Capacidad máxima de personas en la habitación
        this.disponible = disponible; // Indica si la habitación está disponible
    }   
}

// Subclases para las categorias de las habitaciones
class HabitacionBronce extends Habitacion {
    constructor(numero, capacidad, disponible) {
        super(numero, capacidad, disponible);
        this.categoria = "Bronce";//this en el constructor
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n"];
        this.precio = 500;
    }
}

class HabitacionPlata extends Habitacion {
    constructor(numero, capacidad, disponible) {
        super(numero, capacidad, disponible);
        this.categoria = "Plata";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n"];
        this.precio = 1000;
    }
}

class HabitacionOro extends Habitacion {
    constructor(numero, capacidad, disponible) {
        super(numero, capacidad, disponible);
        this.categoria = "Oro";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n", "Servicio de transporte al aeropuerto\n", "Jacuzzi\n", "Vista al mar\n"];
        this.precio = 2500; 
    }
}
function calculaTarifa(habitacionEncontrada, numPersonas, opcionesServiciosSeleccionadas) {
    
    let tarifa = numPersonas * habitacionEncontrada.precio; 

    opcionesServiciosSeleccionadas.forEach(servicioSeleccionado => {
        //console.log('Opciones ' + servicioSeleccionado);
        for (let j = 0; j < servicios.length; j++) {
            //console.log('Servicio ' + servicios[j].servicio);
            if (servicioSeleccionado === servicios[j].servicio) {
                tarifa += servicios[j].precio;
                break; // Salir del bucle interno cuando se encuentre el servicio
            }
        }
    }); 
    return tarifa;

}
//Declaro un objeto habitaciones con sus propiedades
const habitaciones = {//Deberia hacer un array para cada categoria
    habitacion1: new HabitacionBronce(1, 4, true),
    habitacion2: new HabitacionPlata(2, 4, false),
    habitacion3: new HabitacionOro(3, 4, false),
    habitacion4: new HabitacionBronce(4, 4, false),
    habitacion5: new HabitacionPlata(5, 4, false),
    habitacion6: new HabitacionOro(6, 4, true),
    habitacion7: new HabitacionBronce(7, 4, true),

};

// Convierto el objeto de habitaciones en dos arrays 
const habitacionesDisponibles = Object.values(habitaciones).filter(habitacion => habitacion.disponible === true);
//Object.values() toma un objeto y crea un array con los valores de todas sus propiedades
//.filter crea un array a partir de una condicion, en este caso que habitacion.disponible sea igual a true
const habitacionesNoDisponibles = Object.values(habitaciones).filter(habitacion => habitacion.disponible === false);

//let CantHabitacionesDisponibles = habitacionesDisponibles.length; ///

/*for (let i = 0; i < habitacionesDisponibles.length; i++) {
    const habitacion = habitacionesDisponibles[i];
    alert(`Habitación ${habitacion.numero} - Capacidad: ${habitacion.capacidad}, Precio: ${habitacion.precio}, Disponible: ${habitacion.disponible}`);
}

for (let i = 0; i < habitacionesNoDisponibles.length; i++) {
    const habitacion = habitacionesNoDisponibles[i];
    alert(`Habitación ${habitacion.numero} - Capacidad: ${habitacion.capacidad}, Precio: ${habitacion.precio}, Disponible: ${habitacion.disponible}`);
}*/

//FORMULARIO
//Obtiene una referencia al formulario por su ID
const formularioReserva = document.getElementById('formularioReserva');

//Declaro las variables para poder ser accedidas fuera del evento
let nombre;
let fechaLlegada;
let fechaSalida;
let numPersonas;
let categHabitacion;
let opcionesServiciosSeleccionadas;

const reservas = [];

//Vaciar LocalStorage
//localStorage.clear();

//Función que se ejecuta cuando se selecciona submit y se envía el formulario
formularioReserva.addEventListener('submit', function (event) {
    //Evita que el formulario se envíe automáticamente
    event.preventDefault();

    //Obtiene los valores ingresados por el usuario en los campos del formulario
    nombre = document.getElementById('nombre').value;
    fechaLlegada = document.getElementById('fecha_llegada').value;
    fechaSalida = document.getElementById('fecha_salida').value;
    numPersonas = document.getElementById('num_personas').value;
    const categHabitacion = document.getElementById('categHabitacion').value;

    const diferenciaMilisegundos = fechaSalida - fechaLlegada;

    // Convierte la diferencia en milisegundos a días
    const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
    //alert(`La diferencia entre las fechas es de ${diferenciaDias} días.`);

    // Comprueba si la diferencia es mayor a 15 días
  /*  if (diferenciaDias > 15) {
        console.log('Hay más de 15 días de diferencia entre las fechas.');
    } else {
        console.log('No hay más de 15 días de diferencia entre las fechas.');
    }*/
    
    //Selecciona la primer habitacion disponible de la categoria seleccionada
    let habitacionEncontrada = null;

    for (const hab in habitacionesDisponibles) {
    if (habitacionesDisponibles.hasOwnProperty(hab)) {//método para determinar si el objeto tiene una propiedad específica
        const habitacion = habitacionesDisponibles[hab];
        
        if (habitacion instanceof HabitacionBronce && categHabitacion === "bronce") {
        habitacionEncontrada = habitacion;
        break;
        } else if (habitacion instanceof HabitacionPlata && categHabitacion === "plata") {
        habitacionEncontrada = habitacion;
        break;
        } else if (habitacion instanceof HabitacionOro && categHabitacion === "oro") {
        habitacionEncontrada = habitacion;
        break;
        }
    }
    }

    if (habitacionEncontrada) {
        //La funcion splice requiere el indice del elemento a eliminar
        const indice = habitacionesDisponibles.indexOf(habitacionEncontrada);
        habitacionesDisponibles.splice(indice,1)//indice y cantidad de elementos a eliminar a partir de allí  
        habitacionesNoDisponibles.push(habitacionEncontrada)
    } else {
        alert(`Lo sentimos, no se encuentran habitaciones disponibles para la categoría "${categHabitacion}".`);
    }

    //CONTROL DE ERRORES
    let hayErrores = false;

    if(fechaLlegada > fechaSalida){
        alert("Por favor, ingrese una fecha de salida correcta.");
        hayErrores = true; 
    }
 
    //Si hay errores, no envíes el form
    if (hayErrores) {
        return;
    }

    let selectServicios = document.getElementById('servicioEspecial');
    opcionesServiciosSeleccionadas = Array.from(selectServicios.selectedOptions).map(option => option.value);
    
    //Almaceno los datos del LocalStorage

    // Recupera la lista actual de reservas del localStorage, si existe
    let reservas = JSON.parse(localStorage.getItem('datosReserva')) || [];

    // Creo un objeto para almacenar los datos
    const datosReserva = {
        nombre: nombre,
        fechaLlegada: fechaLlegada,
        fechaSalida: fechaSalida,
        numPersonas: numPersonas,
        categHabitacion: habitacionEncontrada,
        opcionesServiciosSeleccionadas: opcionesServiciosSeleccionadas
    };

    
    reservas.push(datosReserva);
    // Convierte el objeto en una cadena JSON
    const datosReservaJSON = JSON.stringify(reservas);

    // Almacena la cadena JSON en el localStorage
    localStorage.setItem('datosReserva', datosReservaJSON);

    // Proximamente: Enviar los datos a través de AJAX 
    
    // MUESTRO EL CONTENIDO EN LA CONSOLA

    const tarifa = calculaTarifa(habitacionEncontrada, numPersonas, opcionesServiciosSeleccionadas);
    const serviciosSinComas = habitacionEncontrada.servicios.join('');//Spread?

console.log(`RESUMEN DE RESERVA\n
Nombre: ${nombre}
\nCantidad de Personas: ${numPersonas}` +   
`\n\nFecha de llegada: ${fechaLlegada}             
Fecha de salida: ${fechaSalida}
\nReserva: Habitación ${habitacionEncontrada.numero} 
\nCategoria: ${categHabitacion}                   
\n${serviciosSinComas}
Tarifa total: $${tarifa}`); 
//<pre> para presentar el formato como lo escribo acá 
Swal.fire({
    title: 'Resumen de Reserva',
    html: `<pre>
${nombre}

${numPersonas} personas.

Fecha de llegada: ${fechaLlegada}
Fecha de salida: ${fechaSalida}

Habitación ${habitacionEncontrada.numero}

Categoría: ${categHabitacion}

Tarifa total: $${tarifa}
</pre>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',

}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire(
            'Reserva confirmada',
            'Te esperamos!',
            'success'
        )
        console.log(reservas);
    }
})




//Agregar el precio a los servicios seleccionados
//Agregar precio a la categoria seleccionada 

/*Revisar por qué no me lo muestra bien, a pesar cumplirse bien la funcion de eliminacion
for (let i = 0; i < habitacionesDisponibles.length; i++) {
    const habitacion = habitacionesDisponibles[i];
    alert(`Habitación ${habitacion.numero} - Capacidad: ${habitacion.capacidad}, Precio: ${habitacion.precio}, Disponible: ${habitacion.disponible}`);
}

for (let i = 0; i < habitacionesNoDisponibles.length; i++) {
    const habitacion = habitacionesNoDisponibles[i];
    alert(`Habitación ${habitacion.numero} - Capacidad: ${habitacion.capacidad}, Precio: ${habitacion.precio}, Disponible: ${habitacion.disponible}`);
}
*/
});

/*//Recupera la cadena JSON del localStorage
const datosReservaJSONRecup = sessionStorage.getItem('datosReserva');

// Convierte la cadena JSON de vuelta a un objeto JavaScript
const datosReservaRecup = JSON.parse(datosReservaJSON);

*/


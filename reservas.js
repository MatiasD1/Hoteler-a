//RESERVAS 

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

// Subclase para habitaciones categoria Bronce
class HabitacionBronce extends Habitacion {
    constructor(numero, capacidad, disponible) {
        super(numero, capacidad, disponible);
        this.categoria = "Bronce";//this en el constructor
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n"];
        this.precio = 500;
    }
}

// Subclase para habitaciones categoria Plata
class HabitacionPlata extends Habitacion {
    constructor(numero, capacidad, disponible) {
        super(numero, capacidad, disponible);
        this.categoria = "Plata";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n"];
        this.precio = 1000;
    }
}

// Subclase para habitaciones categoria Oro
class HabitacionOro extends Habitacion {
    constructor(numero, capacidad, disponible) {
        super(numero, capacidad, disponible);
        this.categoria = "Oro";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n", "Servicio de transporte al aeropuerto\n", "Jacuzzi\n", "Vista al mar\n"];
        this.precio = 2500; 
    }
}
function calculaTarifa(habitacionEncontrada, numPersonas, opcionesSeleccionadas) {
    
    let tarifa = numPersonas * habitacionEncontrada.precio; // Tarifa base por la habitación

    opcionesSeleccionadas.forEach(servicioSeleccionado => {
        console.log('Opciones ' + servicioSeleccionado);
        for (let j = 0; j < servicios.length; j++) {
            console.log('Servicio ' + servicios[j].servicio);
            if (servicioSeleccionado === servicios[j].servicio) {
                tarifa += servicios[j].precio;
                break; // Salir del bucle interno cuando se encuentre el servicio
            }
        }
    });  
    
    return tarifa;
}

const habitaciones = {//Deberia hacer un array para cada categoria
    habitacion1: new HabitacionBronce(1, 4, true),
    habitacion2: new HabitacionPlata(2, 4, false),
    habitacion3: new HabitacionOro(3, 4, false),
    habitacion4: new HabitacionBronce(4, 4, false),
    habitacion5: new HabitacionPlata(5, 4, false),
    habitacion6: new HabitacionOro(6, 4, true),
    habitacion7: new HabitacionBronce(7, 4, true),

};

// Convertir el objeto de habitaciones en dos arrays 
const habitacionesDisponibles = Object.values(habitaciones).filter(habitacion => habitacion.disponible === true);
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
//
//FORMULARIO
// Obtén una referencia al formulario por su ID
const formularioReserva = document.getElementById('formularioReserva');

//  función que se ejecuta cuando se selecciona submit y se envía el formulario
formularioReserva.addEventListener('submit', function (event) {
    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtén los valores ingresados por el usuario en los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const fechaLlegada = document.getElementById('fecha_llegada').value;
    const fechaSalida = document.getElementById('fecha_salida').value;
    const numPersonas = document.getElementById('num_personas').value;
    const categHabitacion = document.getElementById('habitacion').value;

// Calcula la diferencia en milisegundos
const diferenciaMilisegundos = Math.abs(fechaSalida - fechaLlegada);

// Calcula la diferencia en días
const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

// Comprueba si la diferencia es mayor a 15 días
if (diferenciaDias > 15) {
    console.log('Hay más de 15 días de diferencia entre las fechas.');
} else {
    console.log('No hay más de 15 días de diferencia entre las fechas.');
}
    
let habitacionEncontrada = null;

for (const hab in habitacionesDisponibles) {
  if (habitacionesDisponibles.hasOwnProperty(hab)) {
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
   alert(`Habitación ${habitacionEncontrada.numero} - Categoría: "${categHabitacion}" disponible.`);
    habitacionEncontrada.disponible = false;
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
    let opcionesSeleccionadas = Array.from(selectServicios.selectedOptions).map(option => option.value);
    
    // MUESTRO EL CONTENIDO EN LA CONSOLA
    console.log('Nombre:', nombre);
    console.log('Fecha de Llegada:', fechaLlegada);
    console.log('Fecha de Salida:', fechaSalida);
    console.log('Número de Personas:', numPersonas);
    console.log('Habitación:', habitacion);
    console.log('Servicios Especiales:', opcionesSeleccionadas);
    
    // Enviar los datos a través de AJAX 

    const tarifa = calculaTarifa(habitacionEncontrada, numPersonas, opcionesSeleccionadas);
    const serviciosSinComas = habitacionEncontrada.servicios.join('');

console.log(`RESUMEN DE LA RESERVA\n
Nombre: ${nombre}
\nCantidad de Personas: ${numPersonas}` + 
(opcionesSeleccionadas.length !== 0 ? "\n\nServicios Especiales:" + opcionesSeleccionadas.map(servicio => "\n- " + servicio).join("") : "") + //map toma cada servicio y lo transforma en una cadena que comienza con un guión ("- ") //.join("") sirve para unir todas estas cadenas en una sola, sin ningún carácter de separación adicional.  
`\n\nFecha de llegada: ${fechaLlegada}
Fecha de llegada: ${fechaSalida}
\nReserva: Habitación ${habitacionEncontrada.numero}
\nCategoria: ${categHabitacion}
\n${serviciosSinComas}
Tarifa total: $${tarifa}`); 

});



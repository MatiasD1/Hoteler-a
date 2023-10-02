//RESERVAS 

const servicios = [
    { servicio: 'Gimnasio', precio: 200 },
    { servicio: 'Spa', precio: 400 },
    { servicio: 'Clases de Surf', precio: 500 }
];

class Habitacion {
    constructor(numero, capacidad, precio, disponible) {
        this.numero = numero; //Numero de la habitacion
        this.capacidad = capacidad; // Capacidad máxima de personas en la habitación
        this.precio = precio; // Precio base de la habitación
        this.disponible = disponible; // Indica si la habitación está disponible
    }   
}

// Subclase para habitaciones categoria Bronce
class HabitacionBronce extends Habitacion {
    constructor(numero, capacidad, precio, disponible) {
        super(numero, capacidad, precio, disponible);
        this.categoria = "Bronce";//this en el constructor
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n"];
    }
}

// Subclase para habitaciones categoria Plata
class HabitacionPlata extends Habitacion {
    constructor(numero, capacidad, precio, disponible) {
        super(numero, capacidad, precio, disponible);
        this.categoria = "Plata";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n"];
    }
}

// Subclase para habitaciones categoria Oro
class HabitacionOro extends Habitacion {
    constructor(numero, capacidad, precio, disponible) {
        super(numero, capacidad, precio, disponible);
        this.categoria = "Oro";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n", "Servicio de transporte al aeropuerto\n", "Jacuzzi\n", "Vista al mar\n"];
    }
}
function calculaTarifa(cantDias) {
    let tarifa = cantDias * costoHabitacion; // Tarifa base por la habitación

    for (let i = 0; i < opcionesSeleccionadas.length; i++) {
        for (let j = 0; j < servicios.length; j++) {
            if (opcionesSeleccionadas[i] === servicios[j].servicio) {
                tarifa += servicios[j].precio;
                break; // Salir del bucle interno cuando se encuentre el servicio
            }
        }
    }
    return tarifa;
}

const habitaciones = {//Deberia hacer un array para cada categoria
    habitacion1: new HabitacionBronce(1, 4, 50, true),
    habitacion2: new HabitacionPlata(2, 4, 100, false),
    habitacion3: new HabitacionOro(3, 4, 150, true),
    habitacion4: new HabitacionOro(4, 4, 150, false),
    habitacion5: new HabitacionOro(5, 4, 150, false),
    habitacion6: new HabitacionOro(6, 4, 150, true),
    habitacion7: new HabitacionOro(7, 4, 150, true),

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

for (const hab in habitaciones) {
  if (habitaciones.hasOwnProperty(hab)) {
    const habitacion = habitaciones[hab];
    
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
  alert(`Habitación ${habitacionEncontrada.numero} - Categoría: "${categHabitacion} disponible.".`);
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

    const tarifa = calculaTarifa(cantDias);

alert(`RESUMEN DE LA RESERVA\n
Nombre: ${nombre}
\nCantidad de Personas: ${numPersonas}` + 
(opcionesSeleccionadas.length !== 0 ? "\n\nServicios Especiales:" + opcionesSeleccionadas.map(servicio => "\n- " + servicio).join("") : "") + //map toma cada servicio y lo transforma en una cadena que comienza con un guión ("- ") //.join("") sirve para unir todas estas cadenas en una sola, sin ningún carácter de separación adicional.  
`\n\nFecha de llegada: ${fecha_llegada}
\n\nFecha de llegada: ${fecha_salida}
\nReserva: Habitación ${habitacionEncontrada.numero}
\nCategoria: ${categHabitacion}
\nTarifa total: $${tarifa}`); 

});



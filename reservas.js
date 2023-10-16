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
function calculaTarifa(habitacionEncontrada, diasReservados, numPersonas, opcionesServiciosSeleccionadas) {
    
    let tarifa = diasReservados * habitacionEncontrada.precio * numPersonas; 

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

    const fecha1 = luxon.DateTime.fromISO(fechaLlegada);//usar luxon.
    const fecha2 = luxon.DateTime.fromISO(fechaSalida);

    const diferenciaDeDias = fecha2.diff(fecha1, 'days').toObject(); //diff toma dos argumentos: la fecha con la que deseas calcular la diferencia (fecha2 en este caso) y la unidad en la que deseas obtener la diferencia ('days' para obtener la diferencia en días en este caso).
    //.toObject() convierte el resultado de la diferencia en un objeto JavaScript que contiene la cantidad de días en la diferencia.
    console.log('diferenciaDeDias: ' + (++diferenciaDeDias.days));//SUMO 1 porque el ultimo dia se incluye
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
        Swal.fire({
            title: 'Sin Disponibilidad',
            html: `Lo sentimos, todas las habitaciones<br>de la categoría <b>${categHabitacion}</b></br>se encuentran ocupadas.`,
            icon: 'warning'
       })
    }

    //CONTROL DE ERRORES
    let hayErrores = false;

    const fechaActual = luxon.DateTime.now();//Guarda fecha actual 

    if((fecha2 < fecha1) || (fecha1 <= fechaActual)){
        Swal.fire(
            'Fecha inválida',
            'Por favor, ingrese una fecha válida.',
            'error'
        )
        hayErrores = true; 
    }else if(diferenciaDeDias.days > 15){//Cuando calculas la diferencia entre dos fechas usando Luxon, el resultado es un objeto que contiene información detallada sobre la diferencia. En este caso días, a través de la propiedad .days 
        Swal.fire(//interpreta los argumentos en el orden que se proporcionan. el primero es el titulo y el segundo el contenido del cuadro
            'Fecha inválida',
            `Lo sentimos, no es posible hacer una reserva<br>mayor a 15 días.</br>`,
            'error'
        )
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

    let diasReservados = diferenciaDeDias.days;
    const tarifa = calculaTarifa(habitacionEncontrada, diasReservados, numPersonas, opcionesServiciosSeleccionadas);
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

${serviciosSinComas}

Servicios especiales

${opcionesServiciosSeleccionadas}


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
            console.log(habitacionesDisponibles);
        }
    })

});




//PROGRAMA DE HOTELERÍA

//Declaración de variables

let nombreSolicitante = "";
let cantPers;
let cantDias;
let habitacionSeleccionada;
let categHab; 
let salir = false; 

const serviciosReservados = [];

class Habitacion {
    constructor(numero, capacidad, precio, fachaEntrada, fechaSalida, disponible) {
        this.numero = numero; //Numero de la habitacion
        this.capacidad = capacidad; // Capacidad máxima de personas en la habitación
        this.precio = precio; // Precio base de la habitación
        this.fechaEntrada = fachaEntrada;
        this.fechaSalida = fechaSalida;
        this.disponible = disponible; // Indica si la habitación está disponible
    }
}

// Subclase para habitaciones categoria Bronce
class HabitacionUnaEstrella extends Habitacion {
    constructor(numero, capacidad, precio, fechaEntrada, fechaSalida, disponible) {
        super(numero, capacidad, precio, fechaEntrada, fechaSalida, disponible);
        this.categoria = "Bronce";
        this.servicios = ["Servicio a la habitación", "Wi-Fi gratuito", "Televisión por cable"];
    }
}

// Subclase para habitaciones categoria Plata
class HabitacionDosEstrellas extends Habitacion {
    constructor(numero, capacidad, precio, fechaEntrada, fechaSalida, disponible) {
        super(numero, capacidad, precio, fechaEntrada, fechaSalida, disponible);
        this.categoria = "Plata";
        this.servicios = ["Servicio a la habitación", "Wi-Fi gratuito", "Televisión por cable", "Balcón privado", "Mini bar", "Servicio de transporte local"];
    }
}

// Subclase para habitaciones categoria Oro
class HabitacionTresEstrellas extends Habitacion {
    constructor(numero, capacidad, precio, fechaEntrada, fechaSalida, disponible) {
        super(numero, capacidad, precio, fechaEntrada, fechaSalida, disponible);
        this.categoria = "Oro";
        this.servicios = ["Servicio a la habitación", "Wi-Fi gratuito", "Televisión por cable", "Balcón privado", "Mini bar", "Servicio de transporte local", "Servicio de transporte al aeropuerto", "Jacuzzi", "Vista al mar"];
    }
}

// Obtiene del DOM las flechas, el año con el mes y los dias del calendario que se generan dinámicamente(todo lo que se utilizará acá)
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const calendario = document.getElementById("calendario");

// Crear un objeto de la fecha actual
const currentDate = new Date();

// Guardo el mes anterior y el anio actual para cuando haya que controlar la seleccion de los dias y para cuando haya que cambiar el mes 
const mesAnterior = currentDate.getMonth() - 1;
const anioActual = currentDate.getFullYear(); 

// Función para generar y mostrar el calendario del mes actual
function showCalendar() {
    const year = currentDate.getFullYear();//obtiene el anio actual
    const month = currentDate.getMonth();//obtiene el mes actual

    // Configurar el encabezado del mes y año
    monthYear.innerHTML = new Date(year, month, 1).toLocaleDateString('es', { month: 'long', year: 'numeric' });//configura el encabezado del calendario con el mes y el anio actuales

    // Obtener el primer día del mes y el último día del mes
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Generar días del calendario y los agrega al contenedor calendarDays
    let calendarHTML = "";
    for (let day = 1; day <= lastDay; day++) {
        // Agregar un identificador único a cada día
        const dayId = `day-${day}`;
        calendarHTML += `<div id="${dayId}" class="calendar-day">${day}</div>`;
    }

    // Agregar días en blanco al principio (según el primer día de la semana)
    for (let i = 0; i < firstDay; i++) {
        calendarHTML = '<div></div>' + calendarHTML;
    }

    // Agregar días al contenedor del calendario
    calendarDays.innerHTML = calendarHTML;

    // Define un array para almacenar los días seleccionados
    const diasSeleccionados = [];

    let lastSelectedDay = null; // Almacenar el último día seleccionado
    
    for (let day = 1; day <= lastDay; day++) {
        const dayId = `day-${day}`;
        const dayElement = document.getElementById(dayId);
    
        // Agregar evento de clic
        dayElement.addEventListener("click", () => {
            // Realiza acciones cuando un día es seleccionado
            if (diasSeleccionados.length === 0 || Math.abs(day - diasSeleccionados[diasSeleccionados.length - 1]) === 1 || Math.abs(diasSeleccionados[0] - day) === 1) {
                // Verifica si es el primer día seleccionado o si es consecutivo al último
            /*   if (dayElement.classList.contains("selected")) {
                    // Si ya está seleccionado, desmárcalo
                    dayElement.classList.remove("selected");
        
                    // Verifica si el día que se hace clic es el primero o el último en el rango seleccionado
                    if (day === diasSeleccionados[0]) {
                        // Es el primer día, elimínalo del principio del array
                        diasSeleccionados.shift();
                    } else if (day === diasSeleccionados[diasSeleccionados.length - 1]) {
                        // Es el último día, elimínalo del final del array
                        diasSeleccionados.pop();
            
                        // Elimina el día de la lista de días seleccionados
                        const index = diasSeleccionados.indexOf(day);
                        if (index !== -1) {
                            diasSeleccionados.splice(index, 1);
                        }
                    }
                } else*/ if (diasSeleccionados.length < 15) {
                    // Si no está seleccionado, márquelo
                    dayElement.classList.add("selected");
        
                    // Agrega el día a la lista de días seleccionados
                    diasSeleccionados.push(day);
                    diasSeleccionados.sort((a, b) => a - b);
                } else {
                    alert("No es posible realizar reservas para una estadía mayor a 15 días.");
                }
            }
        });
        
    }
    
    if (salir) {
        alert("toy por salir");
        return; // Sal de la función si debeSalir es true
    }
    alert("toy abajo");
}

const habitaciones = {
    habitacion1: new HabitacionUnaEstrella(1, 4, 50, '2023-09-20', '2023-09-25', true),
    habitacion2: new HabitacionDosEstrellas(2, 4, 100, null, null, false),
    habitacion3: new HabitacionTresEstrellas(3, 4, 150, '2023-09-20', '2023-09-25', true),
    habitacion4: new HabitacionDosEstrellas(4, 4, 100, null, null, false),
    habitacion5: new HabitacionTresEstrellas(5, 4, 150, '2023-09-20', '2023-09-25', true),
};

// Convertir el objeto de habitaciones en dos arrays 
const habitacionesDisponibles = Object.values(habitaciones).filter(habitacion => habitacion.disponible === true);
const habitacionesNoDisponibles = Object.values(habitaciones).filter(habitacion => habitacion.disponible === false);

let CantHabitacionesDisponibles = habitacionesDisponibles.length;

//SITIO WEB
alert("Hotel Viña del Mar ~~~ Realizar Reserva")

//El usuario ingresa sus datos (simplificado en este caso en "nombre")
while (nombreSolicitante.trim() === "")//trim se asegura de que no haya espacios adicionales innecesarios alrededor del texto
    nombreSolicitante = prompt("Por favor, ingrese su nombre: ");

while(true){

    cantPers = Number(prompt("Cantidad de personas: "));
    if (isNaN(cantPers) || cantPers < 1 || cantPers > 4)  
        alert("Por favor, ingrese una cantidad válida.");
    else
        break;
}



showCalendar();
const botonAceptar = document.getElementById("BotonAceptar");
    botonAceptar.addEventListener("click", () => {
        salir = true;
        calendario.style.display = 'none';
    });
alert("sali de la funcion!");





while(true){ 

        //Busca si hay una habitacion disponible 
        if (CantHabitacionesDisponibles > 0){ 
            respuesta = prompt("Habitaciones disponibles:\n" + habitacionesDisponibles.map((habitacion, index) => `${index + 1} - Habitación ${habitacionesDisponibles[index].numero}`).join("\n") + "\nIngrese el número de la opción de la habitación que desea reservar");
            const indice = parseInt(respuesta) - 1;
            if (!isNaN(indice) && indice >= 0 && indice < habitacionesDisponibles.length) {
                habitacionesDisponibles[indice].disponible = false; 
                CantHabitacionesDisponibles--; //Decrementa la cantidad de habitaciones disponibles
                habitacionSeleccionada = habitacionesDisponibles[indice];
                habitacionesDisponibles.splice(indice, 1);
                habitacionesNoDisponibles.push(habitacionSeleccionada); 
                //alert("Habitación " + habitacionSeleccionada.numero + " reservada exitosamente");
                break;
            } else 
                alert(`Por favor, ingrese una opción válida.`);
            
        }
        else
            alert("Lo sentimos, no hay habitaciones disponibles en este momento."); 
           
} 

alert(`RESUMEN DE LA RESERVA\n
Nombre: ${nombreSolicitante}
\nReserva: Habitación ${habitacionSeleccionada.numero}
\nCategoria: ${categHab}`); 


        
           

// Mostrar calendario al cargar la página


// Eventos para cambiar de mes

prevMonth.addEventListener("click", () => {//ejecuta la funcion cuando escucha un click
    if(((currentDate.getMonth() - 1 ) !== mesAnterior) || ((currentDate.getMonth() - 1 ) === mesAnterior) && (currentDate.getFullYear() !== anioActual)){
        currentDate.setMonth(currentDate.getMonth() - 1);
        showCalendar();
    }
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    showCalendar();
});

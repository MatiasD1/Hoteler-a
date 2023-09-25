//PROGRAMA DE HOTELERÍA

//Declaración de variables

let nombreSolicitante = "";
let cantPers;
let cantDias;
let habitacionSeleccionada;
let categHab; 

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

// ... (código previo)

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

// ... (resto del código)

// ... (resto del código)

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
/*
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
*/
// Obtén elementos del DOM
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");

// Crear un objeto de la fecha actual
const currentDate = new Date();

// Función para mostrar el calendario del mes actual
function showCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Configurar el encabezado del mes y año
    monthYear.innerHTML = new Date(year, month, 1).toLocaleDateString('es', { month: 'long', year: 'numeric' });

    // Obtener el primer día del mes y el último día del mes
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Generar días del calendario
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

    // Agregar evento de clic a cada día
    for (let day = 1; day <= lastDay; day++) {
        const dayId = `day-${day}`;
        const dayElement = document.getElementById(dayId);

        // Agregar evento de clic
        dayElement.addEventListener("click", () => {
            // Realiza acciones cuando un día es seleccionado
            if (dayElement.classList.contains("selected")) {
                // Si ya está seleccionado, desmárcalo
                dayElement.classList.remove("selected");
                // Aquí puedes eliminar el día de la lista de días seleccionados
            } else {
                // Si no está seleccionado, márquelo
                dayElement.classList.add("selected");
                // Aquí puedes agregar el día a la lista de días seleccionados
            }
        });
    }
}

// Mostrar calendario al cargar la página
showCalendar();

// Eventos para cambiar de mes
const mesAnterior = currentDate.getMonth() - 1;
const anioActual = currentDate.getFullYear(); 

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

//PROGRAMA DE HOTELERÍA

//Declaración de variables

let nombreSolicitante = "";
let cantPers;
let cantDias;
let habitacionSeleccionada;
let categHab; 

const costoHabitacion = 300;

const servicios = [
    { servicio: 'Gimnasio', precio: 200 },
    { servicio: 'Spa', precio: 400 },
    { servicio: 'Clases de Surf', precio: 500 }
];

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
    constructor(numero, capacidad, precio, disponible) {
        super(numero, capacidad, precio, disponible);
        this.categoria = "Bronce";//this en el constructor
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n"];
    }
}

// Subclase para habitaciones categoria Plata
class HabitacionDosEstrellas extends Habitacion {
    constructor(numero, capacidad, precio, disponible) {
        super(numero, capacidad, precio, disponible);
        this.categoria = "Plata";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n"];
    }
}

// Subclase para habitaciones categoria Oro
class HabitacionTresEstrellas extends Habitacion {
    constructor(numero, capacidad, precio, disponible) {
        super(numero, capacidad, precio, disponible);
        this.categoria = "Oro";
        this.servicios = ["Servicio a la habitación\n", "Wi-Fi gratuito\n", "Televisión por cable\n", "Balcón privado\n", "Mini bar\n", "Servicio de transporte local\n", "Servicio de transporte al aeropuerto\n", "Jacuzzi\n", "Vista al mar\n"];
    }
}
function calculaTarifa(cantDias) {
    let tarifa = cantDias * costoHabitacion; // Tarifa base por la habitación

    for (let i = 0; i < serviciosReservados.length; i++) {
        for (let j = 0; j < servicios.length; j++) {
            if (serviciosReservados[i] === servicios[j].servicio) {
                tarifa += servicios[j].precio;
                break; // Salir del bucle interno cuando se encuentre el servicio
            }
        }
    }
    return tarifa;
}

const habitaciones = {
    habitacion1: new HabitacionUnaEstrella(1, 4, 50, '2023-09-20', '2023-09-25', true),
    habitacion2: new HabitacionDosEstrellas(2, 4, 100,'2023-09-20', '2023-09-25', false),
    habitacion3: new HabitacionTresEstrellas(3, 4, 150, '2023-09-20', '2023-09-25', true)
};

// Convertir el objeto de habitaciones en dos arrays 
const habitacionesDisponibles = Object.values(habitaciones).filter(habitacion => habitacion.disponible === true);
const habitacionesNoDisponibles = Object.values(habitaciones).filter(habitacion => habitacion.disponible === false);

let CantHabitacionesDisponibles = habitacionesDisponibles.length;

/*for (let i = 0; i < habitacionesDisponibles.length; i++) {
    const habitacion = habitacionesDisponibles[i];
    alert(`Habitación ${habitacion.numero} - Capacidad: ${habitacion.capacidad}, Precio: ${habitacion.precio}, Disponible: ${habitacion.disponible}`);
}

for (let i = 0; i < habitacionesNoDisponibles.length; i++) {
    const habitacion = habitacionesNoDisponibles[i];
    alert(`Habitación ${habitacion.numero} - Capacidad: ${habitacion.capacidad}, Precio: ${habitacion.precio}, Disponible: ${habitacion.disponible}`);
}*/

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
            
//El usuario indica la cantidad de días que reservará 
while (true) {
    cantDias = Number(prompt("Cantidad de días: "));
    if (isNaN(cantDias) || cantDias <= 0) 
        alert("Por favor, ingrese un dato válido.");
    else if(cantDias > 15)
        alert("Lo sentimos. No es posible reservar una estadía mayor a 15 días");
    else 
        break;
}

    // El usuario ingresa la cantidad de personas que se hospedarán
while (true) {
    
    const categ = Number(prompt("Seleccione la categoría de habitación:\n\n 1-Bronce\n 2-Plata\n 3-Oro\n"));
    if (isNaN(categ) || categ < 1 || categ > 3)  {
        alert("Por favor, ingrese una opción válida.");
    } else { 
 
            switch (categ) {
                case 1:
                    respuesta = prompt("Servicio Bronce\n\n- Servicio a la habitación\n- Wi-Fi gratuito\n- Televisión por cable\n\nDesea confirmar su selección? S/N").toUpperCase();
                    categHab = 'Bronce';
                    break;
                case 2:
                    respuesta = prompt("Servicio Plata\n\n- Servicio a la habitación\n- Wi-Fi gratuito\n- Televisión por cable\n- Balcón privado\n- Mini bar\n- Servicio de transporte local\n\nDesea confirmar su selección? S/N").toUpperCase();
                    categHab = 'Plata';
                    break;
                case 3:
                    respuesta = prompt("Servicio Plata\n\n- Servicio a la habitación\n- Wi-Fi gratuito\n- Televisión por cable\n- Balcón privado\n- Mini bar\n- Servicio de transporte local\n- Servicio de transporte al aeropuerto\n- Jacuzzi\n- Vista al mar\n\nDesea confirmar su selección? S/N").toUpperCase();
                    categHab = 'Oro';
                    break;
            }   
        }
        if (respuesta === "S") {  
            alert("Usted ha reservado la categoria " + categHab + "."); 
            break;
        }
        else if(respuesta !== "N")
            alert("Opción no válida. Por favor, seleccione una opción válida.");
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

//El usuario selecciona el tipo de servicio para su estadía
while (true) {
    respuesta = prompt("Desea añadir servicios especiales a su estadía? S/N").toUpperCase();
    if (respuesta === "S") {
        let opcion, opcion2;
        let cantServicios = 0;
        while (opcion !== "0") {
            opcion = prompt("Indique el número del servicio a reservar:\n\n1- Gimnasio $"+ servicios[0].precio + " \n2- Spa $"+ servicios[1].precio +"\n3- Clases de Surf $"+ servicios[2].precio + "\n0- Finalizar\n\nIngrese el número de opción:");
            switch (opcion) {
                case "1":
                    if(serviciosReservados.includes("Gimnasio")){
                        alert("Usted ya ha seleccionado este servicio.");
                        break;
                    }
                    serviciosReservados.push("Gimnasio");
                    cantServicios++;
                    break;
                case "2":
                    if(serviciosReservados.includes("Spa")){
                        alert("Usted ya ha seleccionado este servicio.");
                        break;
                    }
                    serviciosReservados.push("Spa");
                    cantServicios++;
                    break;
                case "3":
                    if(serviciosReservados.includes("Clases de Surf")){
                        alert("Usted ya ha seleccionado este servicio.");
                        break;
                    }
                    serviciosReservados.push("Clases de Surf");
                    cantServicios++;
                    break;
                case "0":
                    if(cantServicios === 0){
                        opcion2 = prompt("No ha añadido ningún servicio ¿Seguro que desea continuar (S/N)?").toUpperCase();
                        switch (opcion2){
                            case "S":
                                break;
                            case "N":
                                opcion = 4;
                                break;
                            default:
                                alert("Opción no válida. Por favor, seleccione una opción válida."); 
                                break;
                        }
                    }
                    // El usuario seleccionó finalizar
                    break;
                default:
                    alert("Opción no válida. Por favor, seleccione una opción válida.");
                    break;
            }
        }
        break;
    }
    else if(respuesta !== "N")
        alert("Opción no válida. Por favor, seleccione una opción válida.");
    else
        break;
}

const tarifa = calculaTarifa(cantDias);

alert(`RESUMEN DE LA RESERVA\n
Nombre: ${nombreSolicitante}
\nCantidad de Personas: ${cantPers}` + 
(serviciosReservados.length !== 0 ? "\n\nServicios Especiales:" + serviciosReservados.map(servicio => "\n- " + servicio).join("") : "") + //map toma cada servicio y lo transforma en una cadena que comienza con un guión ("- ") //.join("") sirve para unir todas estas cadenas en una sola, sin ningún carácter de separación adicional.  
`\n\nCantidad de Días: ${cantDias}
\nReserva: Habitación ${habitacionSeleccionada.numero}
\nCategoria: ${categHab}
\nTarifa total: $${tarifa}`); 

// Obtén elementos del DOM
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");

// Crear un objeto de fecha
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
        calendarHTML += `<div>${day}</div>`;
    }

    // Agregar días en blanco al principio (según el primer día de la semana)
    for (let i = 0; i < firstDay; i++) {
        calendarHTML = `<div></div>` + calendarHTML;
    }

    // Agregar días al contenedor del calendario
    calendarDays.innerHTML = calendarHTML;
}

// Mostrar calendario al cargar la página
showCalendar();

// Eventos para cambiar de mes
prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    showCalendar();
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    showCalendar();
});

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
    const habitacion = document.getElementById('habitacion').value;
   
    const diferenciaMilisegundos = Math.abs(fechaSalida - fechaLlegada);

    // Calcula la diferencia en días
    const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
    // Comprueba si la diferencia es mayor a 15 días
    if (diferenciaDias > 15) {
        console.log('Hay más de 15 días de diferencia entre las fechas.');
    } else {
        console.log('No hay más de 15 días de diferencia entre las fechas.');
    }

    // Otra forma de obtener las opciones como en el let opcionesSeleccionadas = Array.from(selectServicios.selectedOptions).map(option => option.value); 
    /*const servicioEspecialElement = document.getElementById('servicioEspecial');
    const opcionesSeleccionadas = [];
    for (let i = 0; i < servicioEspecialElement.options.length; i++) {
        if (servicioEspecialElement.options[i].selected) {
            opcionesSeleccionadas.push(servicioEspecialElement.options[i].value);
        }
    }*/

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
    // Obtén una referencia al botón por su ID




    // MUESTRO EL CONTENIDO EN LA CONSOLA
    console.log('Nombre:', nombre);
    console.log('Fecha de Llegada:', fechaLlegada);
    console.log('Fecha de Salida:', fechaSalida);
    console.log('Número de Personas:', numPersonas);
    console.log('Habitación:', habitacion);
    console.log('Servicios Especiales:', opcionesSeleccionadas);
    
    // Enviar los datos a través de AJAX 
});

// Obtén una referencia al botón de "Aceptar" por su ID
let botonAceptar = document.getElementById('confirmarServicios');
let botonBorrar = document.getElementById('borrarServicios');
// Agrega un evento de clic al botón
botonAceptar.addEventListener("click", () => {
    // Obtén el elemento <select> por su ID
    let selectServicios = document.getElementById('servicioEspecial');
    
    // Obtén las opciones seleccionadas en el select múltiple
    let opcionesSeleccionadas = Array.from(selectServicios.selectedOptions).map(option => option.value);
    
    // Obtén el Div seleccionados y el elemento <ul> donde se mostrarán las opciones seleccionadas
    let divSeleccionados = document.getElementById("seleccionados");
    let ulSeleccionados = document.getElementById('listaSeleccionados');
    
    
    // Borra cualquier contenido anterior en la lista de seleccionados
    
    ulSeleccionados.innerHTML = '';

    // Agrega cada opción seleccionada como un elemento <li> en la lista
    if(opcionesSeleccionadas == '')
        alert('Usted no ha seleccionado ningún servicio aún.');
    else{
        let p = document.createElement('p');//nombre del nuevo elemento (div,img,p.etc)
        p.textContent = 'Servicios Seleccionados:';//le agrego el contenido
        
        divSeleccionados.insertBefore(p,divSeleccionados.firstChild);//Para insertar al principio del contenedorL: Insertar antes (elemento a insertar, contendor.firstchild[o sea, el primer elemento del contenedor])
        opcionesSeleccionadas.forEach((opcion) => {
            let li = document.createElement('li');
            li.textContent = opcion;
            ulSeleccionados.appendChild(li);
        });
    }
    
});


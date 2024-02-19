const boton = document.querySelector('#boton_enviar');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const day = document.querySelector('#day');
const fechaActual = new Date();
const yearValue = parseInt(year.value);
const monthValue = parseInt(month.value) - 1;
const dayValue = parseInt(day.value);
const fechaInsertada = new Date(yearValue, monthValue, dayValue);

boton.addEventListener('click', function () {
    validacion();
    const diferenciaEnMilisegundos = fechaActual - fechaInsertada;
    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (24 * 60 * 60 * 1000));

    insertarDatos(diferenciaEnDias);
});
function insertarDatos(diferenciaEnDias) {
    const yearRespuesta = document.querySelector('#body_year_response');
    const monthRespuesta = document.querySelector('#body_month_response');
    const dayRespuesta = document.querySelector('#body_day_response');

    // Cálculo de años completos
    const añosCompletos = Math.floor(diferenciaEnDias / 365);

    // Resta los días correspondientes a los años completos
    const diasRestantes = diferenciaEnDias % 365;

    // Cálculo de meses completos
    const mesesCompletos = Math.floor(diasRestantes / 31);

    // Resta los días correspondientes a los meses completos
    const diasRestantesEnMeses = diasRestantes % 31;

    // Asigna los valores a los elementos HTML
    yearRespuesta.innerHTML = añosCompletos;
    monthRespuesta.innerHTML = mesesCompletos;
    dayRespuesta.innerHTML = diasRestantesEnMeses;
}

function validacion(){
    if (isNaN(fechaInsertada.getTime()) || month.value>12 || day.value>31) {
        Swal.fire({
            title: "Fecha no válida",
            text: "Por favor, introduce una fecha válida.",
            icon: "warning"
        });
        return;
    }

    if (year.value === '' || month.value === '' || day.value === '') {
        Swal.fire({
            title: "Debes llenar todos los campos",
        });
        return;
    }
    if (year.value <100 ) {
        Swal.fire({
            title: "Esta calculadora solo calcula la diferencia apartir del año 100 D.C.",
        });
        return;
    }

    if (fechaInsertada > fechaActual) {
        Swal.fire({
            title: "No juegues",
            text: "¡En serio eres del futuro! Inserta un valor válido.",
            icon: "question"
        });
        return;
    }
}
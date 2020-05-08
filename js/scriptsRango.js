window.onload = function() {
    setUpEvents();
}

let datos;
var dia1, dia2, mes1, mes2;

function setUpEvents() {
    const btnSidebarToggle = document.getElementById('sidebarToggle')
    btnSidebarToggle.addEventListener('click', function() {
        if(document.body.classList.contains('sb-sidenav-toggled'))
            localStorage.setItem('sidebar','false');
        else
            localStorage.setItem('sidebar','true');
    });
    // Switch
    const btnSwitch = document.querySelector('#switch');
    btnSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        btnSwitch.classList.toggle('active');
    
        var sidenav = document.getElementById('sidenavAccordion');
        if(document.body.classList.contains('dark')) {
            sidenav.classList.add('sb-sidenav-dark');
            sidenav.classList.remove('sb-sidenav-light');
            localStorage.setItem('modoOscuro','true');
        }
        else {
            sidenav.classList.add('sb-sidenav-light');
            sidenav.classList.remove('sb-sidenav-dark');
            localStorage.setItem('modoOscuro','false');
        }
    });
    // Selección de rango
    dateRangePickerRango = $('input[name="rango"]');
    dateRangePickerRango.on('datepicker-change', function(evt, obj) {
        console.log('change',obj);
        var rangoSeleccionado = document.getElementById("rango");
        var chequeo = chequearRango(obj.value);
        if (chequeo === true) {
            rangoSeleccionado.value = obj.value;
            mostrarGraficoRango();
        }
    });
    // Selección de provincia
    const provinciaSeleccionada = document.getElementById("selectProvincia");
    provinciaSeleccionada.onchange = mostrarGraficoRango;
}

function getConfirmadosByProvincia(nombreProvincia) {
    switch(nombreProvincia) {
        case "Buenos Aires" : return datos[0].confirmados;
        case "Ciudad Autónoma de Buenos Aires": return datos[1].confirmados;
        case "Catamarca" : return datos[2].confirmados;
        case "Chaco" : return datos[3].confirmados;
        case "Chubut" : return datos[4].confirmados;
        case "Córdoba" : return datos[5].confirmados;
        case "Corrientes" : return datos[6].confirmados;
        case "Entre Ríos" : return datos[7].confirmados;
        case "Formosa" : return datos[8].confirmados;
        case "Jujuy" : return datos[9].confirmados;
        case "La Pampa" : return datos[10].confirmados;
        case "La Rioja" : return datos[11].confirmados;
        case "Mendoza" : return datos[12].confirmados;
        case "Misiones" : return datos[13].confirmados;
        case "Neuquén" : return datos[14].confirmados;
        case "Río Negro" : return datos[15].confirmados;
        case "Salta" : return datos[16].confirmados;
        case "San Juan" : return datos[17].confirmados;
        case "San Luis" : return datos[18].confirmados;
        case "Santa Cruz" : return datos[19].confirmados;
        case "Santa Fe" : return datos[20].confirmados;
        case "Santiago del Estero" : return datos[21].confirmados;
        case "Tierra del Fuego" : return datos[22].confirmados;
        case "Tucumán" : return datos[23].confirmados;
    } 
}

function getAcumuladosByProvincia(nombreProvincia) {
    switch(nombreProvincia) {
        case "Buenos Aires" : return datos[0].acumulados;
        case "Ciudad Autónoma de Buenos Aires": return datos[1].acumulados;
        case "Catamarca" : return datos[2].acumulados;
        case "Chaco" : return datos[3].acumulados;
        case "Chubut" : return datos[4].acumulados;
        case "Córdoba" : return datos[5].acumulados;
        case "Corrientes" : return datos[6].acumulados;
        case "Entre Ríos" : return datos[7].acumulados;
        case "Formosa" : return datos[8].acumulados;
        case "Jujuy" : return datos[9].acumulados;
        case "La Pampa" : return datos[10].acumulados;
        case "La Rioja" : return datos[11].acumulados;
        case "Mendoza" : return datos[12].acumulados;
        case "Misiones" : return datos[13].acumulados;
        case "Neuquén" : return datos[14].acumulados;
        case "Río Negro" : return datos[15].acumulados;
        case "Salta" : return datos[16].acumulados;
        case "San Juan" : return datos[17].acumulados;
        case "San Luis" : return datos[18].acumulados;
        case "Santa Cruz" : return datos[19].acumulados;
        case "Santa Fe" : return datos[20].acumulados;
        case "Santiago del Estero" : return datos[21].acumulados;
        case "Tierra del Fuego" : return datos[22].acumulados;
        case "Tucumán" : return datos[23].acumulados;
    }
}

function chequearRango(rangoSeleccionado) {
    console.log('rango');
    var diaMes = rangoSeleccionado.slice(0,5);
    var diaMesArray = diaMes.split("/");
    console.log('dm1',diaMesArray);
    dia1 = parseInt(diaMesArray[0]);
    mes1 = parseInt(diaMesArray[1]);
    diaMes = rangoSeleccionado.slice(14,19);
    diaMesArray = diaMes.split("/");
    console.log('dm2',diaMesArray);
    dia2 = parseInt(diaMesArray[0]);
    mes2 = parseInt(diaMesArray[1]);
    if (dia1 === dia2 & mes1 === mes2) {
        console.log('alerta rango de días');
        $('#modalRango').modal('show');
        return false;
    } else return true;
}

function mostrarGraficoRango() {
    if (dia1 !== undefined) {
        var selectProv = document.getElementById("selectProvincia");
        var provinciaSeleccionada = selectProv.value;
        if (provinciaSeleccionada == "")
            console.log("provincia",provinciaSeleccionada);
        else {
            actualizarLineChart(dia1, mes1, dia2, mes2, provinciaSeleccionada);
            $('#collapseGrafico').collapse();
        }
    }
}

function actualizarLineChart(dia1, mes1, dia2, mes2, provinciaSeleccionada) {
    var newLabels = [];
    var newDataConfirmados = [];
    var newDataAcumulados = [];
    var index = 0;
    let json = "informes.json";
    $.getJSON(json, function (dato) {
        var inicioMes = mes1;
        var inicioDia = dia1;
        while (inicioMes !== mes2) {
            var diaFM = diaFinMes(inicioMes);
            while (inicioDia <= diaFM) {
                datos = dato;
                let datosDia = getDatosByDia(inicioDia + "/" + inicioMes);
                console.log("datosDia",datosDia);
                datos = datosDia.informe;
                newLabels[index] = inicioDia + "/" + inicioMes;
                newDataConfirmados[index] = getConfirmadosByProvincia(provinciaSeleccionada);
                newDataAcumulados[index] = getAcumuladosByProvincia(provinciaSeleccionada);
                inicioDia++;
                index++;
            }
            inicioDia = 1;
            inicioMes++;
        }

        console.log('index',index);
        // mes1 == mes2
        while (inicioDia <= dia2) {
            datos = dato;
            let datosDia = getDatosByDia(inicioDia + "/" + mes2);
            console.log("datosDia",datosDia);
            datos = datosDia.informe;
            newLabels[index] = inicioDia + "/" + mes2;
            newDataConfirmados[index] = getConfirmadosByProvincia(provinciaSeleccionada);
            newDataAcumulados[index] = getAcumuladosByProvincia(provinciaSeleccionada);
            inicioDia++;
            index++;
        }
        console.log('newLabels',newLabels);
        console.log('newDataConfirmados',newDataConfirmados);
        console.log('newDataAcumulados',newDataAcumulados);
        lineChart.data.labels = newLabels;
        lineChart.data.datasets[0].data = newDataConfirmados;
        lineChart.data.datasets[1].data = newDataAcumulados;
        lineChart.update();
    });
}

// Tiene en cuenta los meses: Marzo y Abril
function diaFinMes(mes) {
    if (mes === 3)
        return 31;
    else // mes === 4
        return 30;
}

function getDatosByDia(dia) {
    let obj = datos.filter(function(item) {
        return item.dia === dia
    })[0];
    return obj;
}
window.onload = function() {
    setUpEvents();
}

let datos;
var dia1, dia2, mes1, mes2;

function setUpEvents() {
    const btnSidebarToggle = document.getElementById('sidebarToggle');
    btnSidebarToggle.addEventListener('click', function() { 
        if(document.body.classList.contains('sb-sidenav-toggled'))
            localStorage.setItem('sidebar','false');
        else
            localStorage.setItem('sidebar','true');
    });
    // Switch
    const btnSwitch = document.getElementById('chk');
    btnSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark');
    
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
    // Selección de día
    dateRangePickerDia = $('input[name="dia"]');
    dateRangePickerDia.on('datepicker-change', function(evt, obj) {
        console.log('change',obj);
        var diaSeleccionado = document.getElementById("dia");
        diaSeleccionado.value = obj.value;
        mostrarMapaTablaBarras(diaSeleccionado.value);
    });
}

function mostrarMapaTablaBarras(diaMesAño) {
    console.log('mostrar');
    var diaMes = diaMesAño.slice(0,5);
    console.log("diaMes",diaMes);
    var diaMesArray = diaMes.split("/");
    console.log('día/mes',diaMesArray);
    var dia = parseInt(diaMesArray[0]);
    var mes = parseInt(diaMesArray[1]);
    let json = "informes.json";
    $.getJSON(json, function (dato) {
        console.log("dato",dato);
        datos = dato;
        let datosDia = getDatosByDia(dia + "/" + mes);
        console.log("datosDia",datosDia);
        datos = datosDia.informe;
        // Mapa
        topoLayer.eachLayer(handleLayer);
        // Tabla
        let res = document.getElementById("resultadoTabla");
        res.innerHTML = '';
        for(var i = 0; i < datos.length; i++){
            var item = datos[i];
            res.innerHTML +=
                "<tr>"
                +  "<td>" + item.provincia + "</td>"
                +  "<td>" + item.confirmados + "</td>"
                +  "<td>" + item.acumulados + "</td>"
                "</tr>";
        }
        // Gráficos de barras
        datos.forEach(actualizarBarChart);
        $('#collapseMapaTablaBarras').collapse();
        map.invalidateSize();
    });
}

function getDatosByDia(dia) {
    let obj = datos.filter(function(item) {
        return item.dia === dia
    })[0];
    return obj;
}

function handleLayer(layer){
    layer.setStyle({
        fillColor: getColor(layer.feature.properties.NAME_1),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    });

     layer.on({
         mouseover: highlightFeature,
         mouseout: resetHighlight,
         click: zoomToFeature
     });
 }

function getColor(nombreProvincia) {
    let d = getAcumuladosByProvincia(nombreProvincia);
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
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

function actualizarBarChart(item, index) {
    barChart1.data.datasets[0].data[index] = item.confirmados;
    barChart2.data.datasets[0].data[index] = item.acumulados;
    barChart1.update();  
    barChart2.update();
}
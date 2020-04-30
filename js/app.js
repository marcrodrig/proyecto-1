if (localStorage.getItem('dark-mode') === 'true')
    document.body.classList.add('dark');
else
    document.body.classList.remove('dark');

window.onload = function() {
    setUpEvents();
}

let datos;
var dia1, dia2, mes1, mes2;

function setUpEvents() {
    // Switch
    const btnSwitch = document.querySelector('#switch');
    btnSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        btnSwitch.classList.toggle('active');
    
        if(document.body.classList.contains('dark'))
            localStorage.setItem('dark-mode','true');
        else
            localStorage.setItem('dark-mode','false');
    });
    // Selección de día
    dateRangePickerDia = $('input[name="dia"]');
    dateRangePickerDia.on('datepicker-change', function(evt, obj) {
        console.log('change',obj);
        var diaSeleccionado = document.getElementById("dia");
        diaSeleccionado.value = obj.value;
        mostrarMapaTablaBarras(diaSeleccionado.value);
    });
    // Cambio de tabs para visualización de las acciones por día, con jQuery:
    $('#tabs a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
        map.invalidateSize();
    });
    // Selección de rango
    dateRangePickerRango = $('input[name="rango"]');
    dateRangePickerRango.on('datepicker-change', function(evt, obj) {
        console.log('change',obj);
        var rangoSeleccionado = document.getElementById("rango");
        rangoSeleccionado.value = obj.value;
        chequearRango(rangoSeleccionado.value);
        mostrarGraficoRango();
    });
    // Selección de provincia
    const provinciaSeleccionada = document.getElementById("selectProvincia");
    provinciaSeleccionada.onchange = mostrarGraficoRango;
}

function mostrarMapaTablaBarras(diaMesAño) {
    console.log('mostrar');
    var diaMes = diaMesAño.slice(0,5);
    var diaMesArray = diaMes.split("/");
    console.log('dm',diaMesArray);
    var dia = parseInt(diaMesArray[0]);
    var mes = parseInt(diaMesArray[1]);
    let json = "casos-" + dia + "-" + mes + ".json";
    $.getJSON(json, function (dato) {
        console.log(dato);
        datos = dato;
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
        // Gráfico de barras
        datos.forEach(actualizarBarChart);

        $('#collapseMapaTabla').collapse();
        map.invalidateSize();
    });
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
        case "Tierra del Fuego, Antártida e Islas del Atlántico Sur" : return datos[22].confirmados;
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
        case "Tierra del Fuego, Antártida e Islas del Atlántico Sur" : return datos[22].acumulados;
        case "Tucumán" : return datos[23].acumulados;
    }
}

function actualizarBarChart(item, index) {
    barChart.data.datasets[0].data[index] = item.acumulados;
    barChart.update();
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
}

function mostrarGraficoRango() {
    if (dia1 !== undefined) {
        var selectProv = document.getElementById("selectProvincia");
        var provinciaSeleccionada = selectProv.value;
        if (provinciaSeleccionada == "")
            console.log("provincia",provinciaSeleccionada);
        else {
            actualizarLineChart(dia1, mes2, dia2, mes2, provinciaSeleccionada);
            $('#collapseGraficos2').collapse();
        }
    }
}

function actualizarLineChart(dia1, mes1, dia2, mes2, provinciaSeleccionada) {
    var newLabels = [];
    var newData = [];
    var index = 0;
    if (mes1 == mes2) {
        var inicio = dia1;
        let json;
        while (inicio <= dia2) {
            json = "casos-" + inicio + "-" + mes1 + ".json";
            $.ajax({
                url: json,
                dataType: 'json',  
                async: false,
                success: function(dato){ 
                    console.log(json,dato);
                    datos = dato;
                } 
            });
            newLabels[index] = inicio + "/" + mes1;
            newData[index] = getAcumuladosByProvincia(provinciaSeleccionada);
            inicio++;
            index++;
        }
    }
    console.log('newLabels',newLabels);
    console.log('newData',newData);
    lineChart.data.labels = newLabels;
    lineChart.data.datasets[0].data = newData;
    lineChart.update();
}
const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');

    if(document.body.classList.contains('dark')) {
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layer.setUrl('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', false);
        });
        localStorage.setItem('dark-mode','true');
    }
    else {
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layer.setUrl('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', false);
        });
        localStorage.setItem('dark-mode','false');
    }
});

if (localStorage.getItem('dark-mode') === 'true')
    document.body.classList.add('dark');
    else
    document.body.classList.remove('dark');

let datos;

function setUpEvents() {
    var diaSeleccionado = document.getElementById("date");
    diaSeleccionado.onchange = mostrarMapaTabla;
    var btnCalendario = document.getElementById("btnCalendario");
    btnCalendario.onclick = calendario;
    // Con jQuery:
    $('#tabs a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
        map.invalidateSize();
    });
}

window.onload = function() {
    setUpEvents();
}

$(document).ready(function() {           
    if(document.body.classList.contains('dark')) {
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layer.setUrl('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', false);
        });
    }
    else {
    map.eachLayer(function(layer) {
        if( layer instanceof L.TileLayer )
            layer.setUrl('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', false);
    });
    }
});

function mostrarMapaTabla() {
    var dia = $('#date').datepicker('getDate').getDate();
    var mes = $('#date').datepicker('getDate').getMonth() + 1;
    let json = "casos-" + dia + "-" + mes + ".json";
    $.getJSON(json, function (dato) {
        console.log(dato);
        datos = dato;
        // Mapa
        geojson.eachLayer(function (layer) {  
            layer.setStyle({
                fillColor: getColor(layer.feature.properties.nam),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7});
        });
        // Tabla
        let res = document.getElementById("resultadoTabla");
        res.innerHTML = '';
        for(let item of datos) {
            res.innerHTML += `
                <tr>
                    <td>${item.provincia}</td>
                    <td>${item.confirmados}</td>
                    <td>${item.acumulados}</td>
                </tr>
            `
        }
        // Gráfico de barras
        datos.forEach(actualizarBarChart);
    });    
    $('#collapseMapaTabla').collapse();
    map.invalidateSize();
}

function actualizarBarChart(item, index) {
    barChart.data.datasets[0].data[index] = item.acumulados;
    barChart.update();
}

function calendario() {
    $(document).ready(function() {           
        $('#date').datepicker({
            startDate: '05/04/2020',
            endDate: '15/04/2020',
            language: 'es-ES',
            autoHide: true,            
        });
        $('#date').datepicker('show');
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
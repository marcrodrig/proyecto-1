/* IMPLEMENTAR: cambiar de GeoJSON a TopoJSON */

var map;
var geojson;

function initmap() {
    map = L.map("map").setView([-39, -59], 4);
    map.on('resize', function () {
        map.invalidateSize();
    });
    L.tileLayer.provider('Esri.WorldGrayCanvas').addTo(map);
    geojson = L.geoJson(provincias, { onEachFeature: onEachFeature }).addTo(map);
}

initmap();

function getColorByGrade(d) {
    return  d > 1000 ? '#800026' :
            d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
            d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
            d > 20 ? '#FEB24C' :
            d > 10 ? '#FED976' :
                     '#FFEDA0';
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    var layer = e.target;

    layer.setStyle({
        fillColor: getColor(layer.feature.properties.nam),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    });

    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<center><h4>Casos confirmados</h4>' + (props ?
        '<b>' + props.nam + '</b><br />' + getConfirmadosByProvincia(props.nam)
        + ' casos<br /><i>Acumulados: </i>' + getAcumuladosByProvincia(props.nam) + ' casos<br />'
        + '</center>'
        : 'Deslícese sobre una provincia');
};

info.addTo(map);

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByGrade(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
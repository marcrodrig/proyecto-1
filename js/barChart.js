var canvas1 = document.getElementById("chart1");
var ctx1 = canvas1.getContext('2d');
var chartType = 'horizontalBar';

var dataConfirmados = {
    labels: [
        "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut",
        "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy",
        "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
        "Salta", "San Juan", "San Luis","Santa Cruz", "Santa Fe",
        "Santiago del Estero", "Tierra del Fuego", "Tucumán"
    ],
    datasets: [{
        label: 'Casos confirmados',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',                              
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
    }]
};

var options = {
  maintainAspectRatio: false,
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                  fontSize: 16
            }
        }],
    }
}

var barChart1 = new Chart(ctx1, {
    type: chartType,
    data: dataConfirmados,
    options: options,
});

var canvas = document.getElementById("chart2");
var ctx = canvas.getContext('2d');

var dataAcumulados = {
    labels: [
        "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut",
        "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy",
        "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
        "Salta", "San Juan", "San Luis","Santa Cruz", "Santa Fe",
        "Santiago del Estero", "Tierra del Fuego", "Tucumán"
    ],
    datasets: [{
        label: 'Casos acumulados',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',                              
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
    }]
};

var barChart2 = new Chart(ctx, {
    type: chartType,
    data: dataAcumulados,
    options: options,
});
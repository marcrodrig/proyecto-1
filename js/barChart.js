var canvas = document.getElementById("chart");
var ctx = canvas.getContext('2d');
var chartType = 'horizontalBar';

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

var options = {
  maintainAspectRatio: false,
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                  fontSize: 14
            }
        }],
    }
}

var barChart = new Chart(ctx, {
    type: chartType,
    data: dataAcumulados,
    options: options,
});
var canvas = document.getElementById("chart");
var ctx = canvas.getContext('2d');
var chartType = 'line';

var dataAcumulados = {
    labels: [],
    datasets:
    [
        {
            label: 'Casos confirmados',
            data: [],
            fill: false,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',                              
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        {
            label: 'Casos acumulados',
            data: [],
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',                              
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};

var options = {
    maintainAspectRatio: false,
    responsive: true,
    /*scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }*/
}

var lineChart = new Chart(ctx, {
    type: chartType,
    data: dataAcumulados,
    options: options,
});
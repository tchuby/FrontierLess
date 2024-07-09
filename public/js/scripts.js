google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['United States', 1000],
        ['Canada', 800],
        ['France', 500],
        ['United Kingdom', 600],
        ['Australia', 900],
        ['Ireland', 900],
        ['Japan', 300],
        ['Malta', 200],
        ['South Africa', 400],
        ['South korea', 400],
        ['Italy', 600],
        ['Germany', 600],
        ['New Zealand', 800],
        ['Argentina', 500],

    ]);

    var options = {
        legend: 'none',
    };
    var chart = new google.visualization.GeoChart(document.getElementById('globalMap'));

    chart.draw(data, options);
}

document.addEventListener('DOMContentLoaded', function () {
    var toastElement = document.getElementById('myToast');
    if (toastElement) {
        var toast = new bootstrap.Toast(toastElement, {
            delay: 3000
        });
        toast.show();
    }
});
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




/*function statusInpt(oEvent) {
    let listaProjetos = document.getElementById('listaProjetos');
    let inputs = listaProjetos.querySelectorAll('input');
    let selects = listaProjetos.querySelectorAll('select');
    let btns = listaProjetos.querySelectorAll('button');

    inputs.forEach(input => {
        if (!oEvent.target.checked) {
            input.removeAttribute('disabled');
        } else {
            input.setAttribute('disabled', 'true');
        }
    });
    selects.forEach(select => {
        if (!oEvent.target.checked) {
            select.removeAttribute('disabled');
        } else {
            select.setAttribute('disabled', 'true');
        }
    });
    btns.forEach(btn => {
        if (!oEvent.target.checked) {
            btn.removeAttribute('disabled');
        } else {
            btn.setAttribute('disabled', 'true');
        }
    });

}
*/



function load_model(){
    var myViewerDiv = document.getElementById('MyViewerDiv');
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);
    var options = {
        'env': 'Local',
        'document': 'models/210 King/Resource/3D_View/_3D_ 1583181/_3D_.svf',
    };
    Autodesk.Viewing.Initializer(options, function () {
        viewer.start(options.document, options);
    });
}

function generate_hour_chart(){
    let date = new Date();
    let currHour = date.getHours();
    let pastContainer = document.getElementById('past');
    let hours = {};

    for (let i = 0; i < currHour; ++i){
        hours[i] = Math.floor(Math.random() * 100);
    }
    console.log(hours);

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(hours),
            datasets: [{
                label: '# of Votes',
                data: Object.values(hours),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

load_model();
generate_hour_chart();


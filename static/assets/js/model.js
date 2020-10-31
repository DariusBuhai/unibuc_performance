var myViewerDiv = document.getElementById('MyViewerDiv');
var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);
var options = {
    'env': 'Local',
    'document': 'models/House/f0224dd3-8767-45c1-ff99-5c9c881b9fee/0.svf',
};

function load_model(){
    Autodesk.Viewing.Initializer(options, function () {
        viewer.start(options.document, options);
    });
}

function addSphere() {        
  //create material red
  var material_red = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  //get bounding box of the model

  var boundingBox = viewer.model.getBoundingBox();

  var maxpt = boundingBox.max;
  var minpt = boundingBox.min;

  var xdiff = maxpt.x - minpt.x;
  var ydiff = maxpt.y - minpt.y;
  var zdiff = maxpt.z - minpt.z;

  //set a nice radius in the model size

  var niceRadius = Math.pow((xdiff * xdiff + ydiff * ydiff + zdiff * zdiff), 0.5) / 10;

  //createsphere1 and place it at max point of boundingBox

  var geom = new THREE.SphereGeometry(niceRadius, 20);
  var sphereMesh = new THREE.Mesh(geom, material_red);

  sphereMesh.position.set(maxpt.x, maxpt.y, maxpt.z);

  if (!viewer.overlays.hasScene('scene1')) {
    viewer.overlays.addScene('scene1');
  }
  viewer.overlays.addMesh(sphereMesh, 'scene1');
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

console.log(1);
viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (event) => {
  addSphere();
  console.log('ceva');
  console.log(event);
});
console.log(2);

load_model();
generate_hour_chart();

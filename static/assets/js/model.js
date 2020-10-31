var myViewerDiv = document.getElementById('MyViewerDiv');
var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);
var options = {
    'env': 'Local',
    'document': 'models/House/f0224dd3-8767-45c1-ff99-5c9c881b9fee/0.svf',
};

let spheres = [];

function load_model(){
    Autodesk.Viewing.Initializer(options, function () {
        viewer.start(options.document, options);
    });
}

function addSphere(coord) {        
  //create material red
  var material_red = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  // //get bounding box of the model
  //
  // var boundingBox = viewer.model.getBoundingBox();
  //
  // var maxpt = boundingBox.max;
  // var minpt = boundingBox.min;
  //
  // var xdiff = maxpt.x - minpt.x;
  // var ydiff = maxpt.y - minpt.y;
  // var zdiff = maxpt.z - minpt.z;
  //
  // //set a nice radius in the model size
  //
  // var niceRadius = Math.pow((xdiff * xdiff + ydiff * ydiff + zdiff * zdiff), 0.5) / 10;
  //
  // //createsphere1 and place it at max point of boundingBox

  var geom = new THREE.SphereGeometry(20, 20);
  var sphereMesh = new THREE.Mesh(geom, material_red);

  sphereMesh.position.set(coord.x, coord.y, coord.z);
  spheres.push(sphereMesh);

  if (!viewer.overlays.hasScene('scene1')) {
    viewer.overlays.addScene('scene1');
  }
  viewer.overlays.addMesh(sphereMesh, 'scene1');
}

var onKeyDown = function(event) {
  if (event.keyCode == 67) { // when 'c' is pressed
    for (sph of spheres) {
      sph.material.color.setHex(0x00ff00); // there is also setHSV and setRGB
    }
    viewer.refresh();
  }
};
document.addEventListener('keydown', onKeyDown, false);

function generate_hour_chart(){
    let date = new Date();
    let currHour = 24;//date.getHours();
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

function getClickCoordinates(event) {
  let intersections = [];
  const bounds = document.getElementById('MyViewerDiv')
    .getElementsByTagName('canvas')[0].getBoundingClientRect();
  viewer.impl.castRayViewport(viewer.impl.clientToViewport(event.clientX - bounds.left, event.clientY - bounds.top), false, null, null, intersections);
  if (intersections.length > 0) {
    const intersection = intersections[0];

    return {
      x: intersection.point.x.toFixed(2),
      y: intersection.point.y.toFixed(2),
      z: intersection.point.z.toFixed(2),
    };
  }
}


function addSphereOnClick(event) {
  coord = getClickCoordinates(event);
  console.log(coord);
  if (coord) {
    addSphere(coord);
  }
}


viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (event) => {
  addSphere();
  console.log('ceva');
  console.log(event);
});

document.getElementById('MyViewerDiv').addEventListener('click', addSphereOnClick);

load_model();
generate_hour_chart();

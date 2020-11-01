var myViewerDiv = document.getElementById('MyViewerDiv');
var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);
var options = {
    'env': 'Local',
    'document': 'models/House/f0224dd3-8767-45c1-ff99-5c9c881b9fee/0.svf',
};

let perc = 0;
let dir = "up";
let spheres = {};

function load_model(){
  Autodesk.Viewing.Initializer(options, function () {
      viewer.start(options.document, options);
  });
}

function addNewButton() {
  let button = new Autodesk.Viewing.UI.Button('hotspot-tool');

  button.addClass('fas')
  button.addClass('fa-mouse-pointer');
  button.setToolTip('Toggle hotspot tool');

  // SubToolbar
  let subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
  subToolbar.addControl(button);
  viewer.toolbar.addControl(subToolbar);

  setTimeout(() => {
    let button = document.getElementById('hotspot-tool');
    button.addEventListener('click', (event) => {
      toggleButton('hotspot-tool');
      event.stopPropagation();
    });
  }, 2000);
}

function isButtonActive(id) {
  let button = document.getElementById(id);
  return button.classList.contains('active');
}

function toggleButton(id) {
  let button = document.getElementById(id);
  if (button.classList.contains('inactive')) {
    button.classList.remove('inactive');
    button.classList.add('active');
  }
  else if (button.classList.contains('active')) {
    button.classList.remove('active');
    button.classList.add('inactive');
  }
}

function addSphere(coord, color = 0xff0000) {        
  var material_red = new THREE.MeshBasicMaterial({ color: color });
  var geom = new THREE.SphereGeometry(20, 20);
  var sphereMesh = new THREE.Mesh(geom, material_red);

  sphereMesh.position.set(coord.x, coord.y, coord.z);
  sphereMesh.ballId = Object.keys(spheres).length + 1;
  spheres[sphereMesh.ballId] = sphereMesh;

  if (!viewer.overlays.hasScene('scene1')) {
    viewer.overlays.addScene('scene1');
  }
  viewer.overlays.addMesh(sphereMesh, 'scene1');
}

// function loadBalls() {
//   console.log('view loaded');
//   http_get('/balls/?buldingId=?'
// }


function getColorFromPercentage(perc) {
  let green = Math.floor(255 * perc) << (8 * 1);
  let red = Math.floor(255 * (1 - perc)) << (8 * 2);
  return green + red;
}


function updateBalls() {
  for (key in spheres) {
    // TODO update spheres color
    spheres[key].material.color.setHex(getColorFromPercentage(perc));
  }
  viewer.refresh();

  if (dir == "up" && perc < 1) {
    perc += 0.05;
    if (1 - perc < 0.0001) {
      dir = "down";
    }
  }
  else if (dir == "down" && perc > 0) {
    perc -= 0.05;
    if (perc < 0.0001) {
      dir = "up";
    }
  }
}

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
  if (isButtonActive('hotspot-tool') && coord) {
    addSphere(coord);
  }
}

load_model();
generate_hour_chart();

viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, addNewButton);
viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, loadBalls);
document.getElementById('MyViewerDiv').addEventListener('click', addSphereOnClick);


setInterval(updateBalls, 500);

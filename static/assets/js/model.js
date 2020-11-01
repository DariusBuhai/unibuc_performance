var myViewerDiv = document.getElementById('MyViewerDiv');
var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);
var options = {
    env: 'Local',
    document: null,
};

let spheres = {};
let url_string = window.location.href
let url = new URL(url_string);
let buildingId = url.searchParams.get("id");

async function get_model_details(){
    let building_details = await http_get_async("/api/building/"+buildingId, true);
    options.document = "models/"+building_details.svfLink;
    document.getElementById("building_name").innerText = building_details.name;
    document.getElementById("building_address").innerText = building_details.address;
}

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

function addSphere(ball) {        
  var material = new THREE.MeshBasicMaterial({ color: getColorFromPercentage(
    parseFloat(ball.capacity) / parseFloat(ball.maxCapacity)) });
  var geom = new THREE.SphereGeometry(10, 10);
  var sphereMesh = new THREE.Mesh(geom, material);

  sphereMesh.position.set(ball.x, ball.y, ball.z);
  sphereMesh.ballId = ball.id;
  spheres[sphereMesh.ballId] = sphereMesh;

  if (!viewer.overlays.hasScene('scene1')) {
    viewer.overlays.addScene('scene1');
  }
  viewer.overlays.addMesh(sphereMesh, 'scene1');
}

async function loadBalls() {
  console.log('view loaded');
  let balls = await http_get_async(`/api/balls/${buildingId}`, true);
  console.log('in load')
  console.log(balls)
  for (ball of balls) {
    addSphere(ball);
  }

  setInterval(updateBalls, 2500);
}

function getColorFromPercentage(perc) {
  let green = Math.floor(255 * (1 - perc)) << (8 * 1);
  let red = Math.floor(255 * perc) << (8 * 2);
  return green + red;
}


async function updateBalls() {
  let balls = await http_get_async(`/api/balls/${buildingId}`, true);
  for (ball of balls) {
    // TODO update spheres color
    spheres[parseInt(ball.id)].material.color.setHex(getColorFromPercentage(
      parseFloat(ball.capacity) / parseFloat(ball.maxCapacity)
    ));
  }
  viewer.refresh();
}

async function generate_hour_chart(){
    let hours_values = await http_get_async("/api/chart/"+buildingId, true);

    let hours = {};
    for (let i = 0; i < hours_values.length; ++i)
        hours[i] = hours_values[i];

    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
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

    let name = prompt("New area name");
    if (!name) return;
    let capacity = prompt("New area capacity");
    if (!capacity) return;

    ball = {
      id: Object.keys(spheres).length + 1,
      buildingId: buildingId,
      x: coord.x,
      y: coord.y,
      z: coord.z,
      name: name,
      maxCapacity: capacity,
      capacity: 0,
    }

    if (ball.name && ball.maxCapacity) {
      addSphere(ball);
    }
  }
}

async function initiate_model(){
  get_model_details().then(() => {
    viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, loadBalls);
  });

  load_model();
  generate_hour_chart();
  viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, addNewButton);
  document.getElementById('MyViewerDiv').addEventListener('click', addSphereOnClick);
}

initiate_model();

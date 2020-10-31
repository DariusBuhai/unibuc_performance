var myViewerDiv = document.getElementById('MyViewerDiv');
var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);
var options = {
    'env' : 'Local',
    'document' : 'House/5f6ae103-9de8-048e-f858-c7b0b0b9f46c/1.svf'
};

Autodesk.Viewing.Initializer(options, function() {
    viewer.start(options.document, options);
});

// var geom = new THREE.SphereGeometry(50, 50, 50);
// var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// var sphereMesh = new THREE.Mesh(geom, material);
// sphereMesh.position.set(100, 200, 3000);
//
// console.log('lmao');
// if (!viewer.overlays.hasScene('custom-scene')) {
//     console.log('lmao');
//     viewer.overlays.addScene('custom-scene');
// }
//
// viewer.overlays.addMesh(sphereMesh, 'custom-scene');

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
  console.log(geom);
  var sphereMesh = new THREE.Mesh(geom, material_red);
  console.log(sphereMesh);

  sphereMesh.position.set(maxpt.x, maxpt.y, maxpt.z);

  if (!viewer.overlays.hasScene('scene1')) {
    console.log('lmao');
    viewer.overlays.addScene('scene1');
  }
  viewer.overlays.addMesh(sphereMesh, 'scene1');
}

setTimeout(10000, addSphere);

viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVEN, (event) => {
  addSphere();
  console.log('ceva');
  // console.log(event);
});

// load model view

var myViewerDiv = document.getElementById('MyViewerDiv');
var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);
var options = {
    'env': 'Local',
    'document': 'models/210 King/Resource/3D_View/_3D_ 1583181/_3D_.svf',
};
Autodesk.Viewing.Initializer(options, function () {
    viewer.start(options.document, options);
});

// display informations about the building

// past info about the building
let date = new Date();
let currHour = date.getHours();
let pastContainer = document.getElementById('past');

if (currHour == 0) {
    let element = document.createElement('p');
    element.innerText = 'No information avaliable for today';

    pastContainer.appendChild(element);
}

for (let i = 0; i < currHour; ++i) {
    let element = document.createElement('p');
    element.innerText = 'See info from ' + toString(i) + ':00';

    pastContainer.appendChild(element);
}


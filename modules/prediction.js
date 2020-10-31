const ip = require('interpolating-polynomial');
const db = require('mongo.js');

function makePrediction(hourValue) {
    let dataset = db.getHoursList();
    let points = [];

    for(let i = 0; i < dataset.length(); ++i) {
        points.push([i, dataset[i].date.getHours()]);
    }

    f = ip(points);

    return f(hourValue);
}
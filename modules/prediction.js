const ip = require('interpolating-polynomial');
const db = require('modules/dataset.js');

class Prediction {

    async makePrediction(hourValue) {
        let dataset = await db.getEventsList();
        let points = [];

        for(let i = 0; i < dataset.length(); ++i) {
            points.push([i, dataset[i].peopleAmount]);
        }

        f = ip(points);

        return f(hourValue);
    }
}

module.exports = Prediction;
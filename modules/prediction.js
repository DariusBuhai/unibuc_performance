const ip = require('interpolating-polynomial');
const db = require('modules/dataset.js');

class Prediction {

    async makePrediction() {
        let dataset = await db.getEventsList();
        let points = [];

        for(let i = 0; i < dataset.length(); ++i) {
            points.push([i, dataset[i].peopleAmount]);
        }

        let f = ip(points);

        let date = new Date();
        return f(date.getHours());
    }
}

module.exports = Prediction;
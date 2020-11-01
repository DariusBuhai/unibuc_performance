const ip = require('interpolating-polynomial');
const db = require('./dataset.js');

class Prediction {

    async makePrediction(idBuilding) {
        let dataset = await db.prototype.getEventsList(idBuilding);
        let points = [];
        let date = new Date();

        for(let i = 0; i < dataset.length; ++i)
            if (dataset[i].time < date.getHours())
                points.push([i, dataset[i].peopleAmount]);

        let f = ip(points);
        return f(date.getHours());
    }
}

module.exports = Prediction;
const ip = require('interpolating-polynomial');
const db = require('./dataset.js');

class Prediction {

    async makePrediction(idBuilding) {
        let dataset = await db.prototype.getEventsList();
        let points = [];

        for(let i = 0; i < dataset.length; ++i)
            if(dataset[i].idBuilding==idBuilding)
                points.push([i, dataset[i].peopleAmount]);

        let f = ip(points);

        let date = new Date();
        return f(date.getHours());
    }
}

module.exports = Prediction;
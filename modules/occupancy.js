const db = require('modules/dataset.js');

class Occupancy {

    async calculateOccupancy(buildingId) {
        let ballsList = await db.getBalls().toArray();
        let maximumCapacuty = 0;
        let actualCapacity = 0;

        for (let i = 0; i < ballsList.length; ++i) 
            if (ballsList[i].idBuilding== buildingId) {
                maximumCapacuty += ballsList[i].maxCapacity;
                actualCapacity += ballsList[i].capcacity;
            }
            
        return (actualCapacity / maxCapacity) * 100;
    }
}

module.exports = Occupancy;
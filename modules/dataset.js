const url = "mongodb+srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

// Buildings:
// id #
// adminId #
// name
// address
// category
// modelLink
// svfLink

// Events:
// idBuilding
// time (hour)
// peopleAmount

// Balls:
// idBall
// name
// idBuilding
// xCoord
// yCoord
// zCoord
// maxCapacity
// capacity

// Users(Admins):
// id #
// username
// password

// LicenseKeys:
// id #
// licenseKey

class Dataset {

    // crud Buildings
    async calculateOccupancy(buildingId) {
        let ballsList = await this.getBalls();
        let maxCapacity = 0;
        let actualCapacity = 0;

        for (let i = 0; i < ballsList.length; ++i)
            if (ballsList[i].idBuilding == buildingId) {
                maxCapacity += ballsList[i].maxCapacity;
                actualCapacity += ballsList[i].capcacity;
            }

        if (maxCapacity == 0) return 0;

        return (actualCapacity / maxCapacity) * 100;
    }

    async insertBuilding(building) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Buildings');
        await collection.insert(building);
    }

    async getBuilding(buildingId) {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection("Buildings");
        let items = await collection.find().toArray();
        for (let i = 0; i < items.length; ++i)
            if (items[i].id == buildingId)
                return items[i];
        return null;
    }

    async getBuildings(){
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection("Buildings");

        let buildings = await collection.find().toArray();
        for (let building of buildings)
            building.status = await this.calculateOccupancy(building.id);
        return buildings;
    }

    async updateBuilding(newBuilding) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Buildings');
        await collection.updateOne({ id: newBuilding.id }, newBuilding);
    }


    // crud Balls
    async insertBalls(ball) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Balls');
        await collection.insert(ball);
    }

    async getBalls(ballId) {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection("Balls");
        let items = collection.find().toArray();
        for (let i = 0; i < items.length(); ++i)
            if (items[i].id == ballId) {
                return items[i];
                break;
            }
        return null;
    }

    async getBalls() {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection("Balls");
        return await collection.find().toArray();
    }

    async updateBalls(newBall) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Balls');
        await collection.updateOne({ id: newBall.id }, newBall);
    }


    // crud Events

    async insertEvents(event) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Events');
        await collection.insert(event);
    }

    async getEvents(eventId) {
        let retVal = null;

        let db = MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Events');
        let items = await collection.find().toArray();
                
        for (let i = 0; i < items.length(); ++i)
            if (items[i].id == eventId) {
                retVal = items[i];
                break;
            }

        return retVal;
    }

    async getEventByHour(idBuilding) {
        let retVal = Array(24).fill(0);

        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection('Events');
        let items = await collection.find({idBuilding: idBuilding}).toArray();

        for (let x of items)
            retVal[x.time] += x.peopleAmount;

        return retVal;
    }

    async getEventsList(idBuilding) {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection('Events');
        let items = await collection.find().toArray();
        let retVal = items.filter((ev) => {
                return ev.idBuilding == idBuilding;
        });
              
        return retVal;
    }

    async updateEvents(newEvent) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Events');
        await collection.updateOne({ id: newEvents.id }, newEvent);
    }


    // crud License

    async getLicense(license) {
        let retVal = false;

        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection('LicenseKeys');
        let items = await collection.find().toArray();
        for (let i = 0; i < items.length; ++i)
            if (await bcrypt.compare(license, items[i].licenseKey)) {
                retVal = true;
                break;
            }
        return retVal;
    }


    //crud Users

    async getAllUsers() {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let result = await dbo.collection("Users").find().toArray();
        return result;
    }

    async addUsers(user) {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection('Users');
        await collection.insert(user);
    }
}

module.exports = Dataset;

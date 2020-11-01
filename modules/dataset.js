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
// id
// buildingId
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
        let items = collection.find().toArray();
        for (let i = 0; i < items.length(); ++i)
            if (items[i].id == buildingId) {
                return items[i];
                break;
            }
        return null;
    }

    async getBuildings(){
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection("Buildings");
        return collection.find().toArray();
    }

    async updateBuilding(newBuilding) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Buildings');
        await collection.updateOne({ id: newBuilding.id }, newBuilding);
    }


    // crud Balls
    async insertBall(ball) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Balls');
        await collection.insert(ball);
    }

    async getBall(id, buildingId) {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection("Balls");
        let item = collection.find({id: id, buildingId: buildingId});
        return item
    }

    async getBalls(buildingId) {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = await dbo.collection("Balls");
        return collection.find({buildingId: buildingId}).toArray();
    }

    async updateBall(newBall) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Balls');
        await collection.updateOne({ id: newBall.id, buildingId: newBall.buildingId }, newBall);
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

    async getEventsList(eventValue) {
        let retVal = [];

        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Events');
        let items = await collection.find().toArray();
        retVal = items.filter((h) => {
                return h.date.time() == eventValue;
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

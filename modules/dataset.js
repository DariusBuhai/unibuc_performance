const url = "mongodb+srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const { raw } = require('express');
const ip = require('interpolating-polynomial');

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
// x
// y
// z
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
        let ballsList = await this.getBalls(buildingId);
        let maxCapacity = 0;
        let actualCapacity = 0;

        for (let i = 0; i < ballsList.length; ++i) {
            maxCapacity += parseInt(ballsList[i].maxCapacity);
            actualCapacity += parseInt(ballsList[i].capacity);
        }

        if (maxCapacity == 0) return 0;
        return Math.floor((parseFloat(actualCapacity) / parseFloat(maxCapacity)) * 100);
    }

    async insertBuilding(building) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Buildings');
        await collection.insert(building);
    }

    async getBuilding(buildingId) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection("Buildings");
        let items = await collection.find().toArray();
        for (let i = 0; i < items.length; ++i)
            if (items[i].id == buildingId){
                items[i].safety = 100 - await this.calculateOccupancy(buildingId);
                //items[i].active_hotspots = 100 - await this.calculateOccupancy(buildingId);
                return items[i];
            }
        return null;
    }

    async getBuildings(){
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection("Buildings");

        let buildings = await collection.find().toArray();
        for (let building of buildings)
            building.status = await this.calculateOccupancy(building.id);
        return buildings;
    }

    async updateBuilding(newBuilding) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Buildings');
        await collection.updateOne({ id: newBuilding.id }, newBuilding);
    }

    // crud Balls
    async insertBall(ball) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Balls');
        await collection.insertOne(ball);
    }

    async getBall(id, buildingId) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection("Balls");
        let item = collection.find({id: parseInt(id), buildingId: parseInt(buildingId)});
        return item
    }

    async getBalls(buildingId) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection("Balls");
        return await collection.find({buildingId: parseInt(buildingId)}).toArray();
    }

    async updateBall(newBall) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Balls');
        await collection.updateOne({ id: parseInt(newBall.id), buildingId: parseInt(newBall.buildingId) }, newBall);
    }

    async deleteBall(id, buildingId) {
        let db = await MongoClient.connect(url);
        let dbo = await db.db("smarthack");
        let collection = dbo.collection('Balls');
        await collection.deleteOne({ id: parseInt(id), buildingId: parseInt(buildingId) });
        //await collection.updateOne({ id: parseInt(id), buildingId: parseInt(buildingId) }, {$set: {show: false}});
    }

    // prediction
    async makePrediction(idBuilding) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Events');
        let rawData = await collection.find({idBuilding: parseInt(idBuilding)}).toArray();
        
        let points = [];
        let date = new Date();

        for(let i = 0; i < rawData.length; ++i)
            if (rawData[i].time < date.getHours())
                points.push([i, rawData[i].peopleAmount]);

        let f = ip(points);
        let ans = f(date.getHours());
        if (ans < 0) ans = 0;
        else if (ans > 200) ans %= 200;
        return JSON.stringify(ans);
    }

    // crud Events

    async insertEvent(event) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Events');
        await collection.updateOne({
            idBuilding: event.idBuilding,
            time: event.time,
        }, {$set: event}, {upsert: true});
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
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Events');
        let items = await collection.find({idBuilding: parseInt(idBuilding)}).toArray();

        let date = new Date();
        for (let x of items)
            if (x.time < date.getHours())
                retVal[x.time] += x.peopleAmount;

        return retVal;
    }

    async getEventsList(idBuilding) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Events');
        let items = await collection.find().toArray();
        let retVal = items.filter((ev) => {
                return ev.idBuilding == idBuilding;
        });
        return retVal;
    }

    async updateEvents(newEvent) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Events');
        await collection.updateOne({ id: newEvents.id }, newEvent);
    }


    // crud License

    async getLicense(license) {
        let retVal = false;

        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('LicenseKeys');
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
        let dbo = db.db("smarthack");
        let result = await dbo.collection("Users").find().toArray();
        return result;
    }

    async addUsers(user) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = dbo.collection('Users');
        await collection.insert(user);
    }
}

module.exports = Dataset;

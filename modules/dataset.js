const url = "mongodb+srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

// Buildings:
// id #
// adminId #
// name
// address
// category
// hotspotNo
// maxCap
// modelLink
// svgLink

// Hours:
// id #
// date
// buildingId
// peopleNo

// Users(Admins):
// id #
// username
// password

// LicenseKeys:
// id #
// licenseKey

class Dataset {

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

    async insertHours(hour) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Hours');
        await collection.insert(hour);
    }

    async getHours(hourId) {
        let retVal = null;

        let db = MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Hours');
        let items = await collection.find().toArray();
                
        for (let i = 0; i < items.length(); ++i)
            if (items[i].id == hourId) {
                retVal = items[i];
                break;
            }

        return retVal;
    }

    async getHoursList(hourValue) {
        let retVal = null;

        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Hours');
        let items = await collection.find().toArray();
        retVal = items.filter((h) => {
                return h.date.getHours() == hourValue;
        });
              
        return retVal;
    }

    async updateHours(newHour) {
        let db = await MongoClient.connect(url);
        let dbo = db.db("smarthack");
        let collection = await dbo.collection('Hours');
        await collection.updateOne({ id: newHours.id }, newHour);
    }

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

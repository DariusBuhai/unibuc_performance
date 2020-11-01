const url = "mongodb+srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

// Buildings:
// id #
// adminId #
// name
// address
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
        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;

            var dbo = db.db("smarthack");
            await dbo.collection('Buildings', async function (err, collection) {
                await collection.insert(building);
            });
        });
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
        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("smarthack");
            await dbo.collection('Buildings', async function (err, collection) {
                await collection.updateOne({ id: newBuilding.id }, newBuilding, function(err, res) {
                    if (err) throw err;
                });
            });
        });
    }

    async insertHours(hour) {
        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("smarthack");
            await dbo.collection('Hours', async function (err, collection) {
                await collection.insert(hour);
            });
        });
    }

    async getHours(hourId) {
        let retVal = null;

        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;

            var dbo = db.db("smarthack");
            await dbo.collection('Hours', async function (err, collection) {
                await collection.find().toArray(function (err, items) {
                    if (err) throw err;

                    for (let i = 0; i < items.length(); ++i)
                        if (items[i].id == hourId) {
                            retVal = items[i];
                            break;
                        }
                });
            });
        });

        return retVal;
    }

    async getHoursList(hourValue) {
        let retVal = null;

        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;

            var dbo = db.db("smarthack");
            await dbo.collection('Hours', async function (err, collection) {
                await collection.find().toArray(async function (err, items) {
                    if (err) throw err;

                    retVal = items.filter((h) => {
                        return h.date.getHours() == hourValue;
                    });
                });
            });
        });

        return retVal;
    }

    async updateHours(newHour) {
        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;

            var dbo = db.db("smarthack");
            await dbo.collection('Hours', async function (err, collection) {
                await collection.updateOne({ id: newHours.id }, newHour, async function (err, res) {
                    if (err) throw err;
                });
            });
        });
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

const url = "mongodb+srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

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

            var dbo = db.db("Cluster0");
            await dbo.collection('Buildings', async function (err, collection) {
                await collection.insert(building);
            });
        });
    }

    async getBuilding(buildingId) {
        let retVal = null;

        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;

            var dbo = db.db("Cluster0");
            await dbo.collection('Buildings', async function (err, collection) {
                await collection.find().toArray(async function (err, items) {
                    if (err) throw err;

                    for (let i = 0; i < items.length(); ++i)
                        if (items[i].id == buildingId) {
                            retVal = items[i];
                            break;
                        }
                });
            });
        });

        return retVal;
    }

    async getBuildings(){
        let retVal = null;
        await MongoClient.connect(url, async function(err, db) {
            if (err) throw err;
            var dbo = db.db("Cluster0");
            await dbo.collection("Buildings").find().toArray(function(err, result) {
                if (err) throw err;
                retVal = result;
                db.close();
            });
        });
        return retVal;
    }

    async updateBuilding(newBuilding) {
        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("Cluster0");
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
            var dbo = db.db("Cluster0");
            await dbo.collection('Hours', async function (err, collection) {
                await collection.insert(hour);
            });
        });
    }

    async getHours(hourId) {
        let retVal = null;

        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;

            var dbo = db.db("Cluster0");
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

            var dbo = db.db("Cluster0");
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

            var dbo = db.db("Cluster0");
            await dbo.collection('Hours', async function (err, collection) {
                await collection.updateOne({ id: newHours.id }, newHour, async function (err, res) {
                    if (err) throw err;
                });
            });
        });
    }

    async getAllUsers() {
        let retVal = null;
        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("Cluster0");
            await dbo.collection("Users").find().toArray(function (err, result) {
                if (err) throw err;
                retVal = result;
                db.close();
            });
        });
        return retVal;
    }

    async getLicense(hashedLicenseKey) {
        let retVal = null;

        await MongoClient.connect(url, async function (err, db) {
            if (err) throw err;

            var dbo = db.db("Cluster0");
            await dbo.collection('LicenseKeys', async function (err, collection) {
                await collection.find().toArray(async function (err, items) {
                    if (err) throw err;

                    for (let i = 0; i < items.length(); ++i)
                        if (items[i].licenseKey == hashedLicenseKey) {
                            retVal = items[i];
                            break;
                        }
                });
            });
        });

        return retVal;
    }


}

module.exports = Dataset;

const url = "mongodb + srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

function insertBuilding(building) {

    // fot testing only
    // building = {
    //     id: 1, name: 'Steve', address: 'Jobs', hospotsNo: 10, maxCap: 100,
    //     peopleByHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    // };

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        db.collection('Buildings', function (err, collection) {
            collection.insert(building);
        });
    });
}

function getBuilding(buildingId) {
    let retVal = null;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        db.collection('Buildings', function (err, collection) {
            collection.find().toArray(function (err, items) {
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

function updateBuilding(newBuilding) {
    MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
        if (err) throw err;

        db.collection('Buildings', function (err, collection) {
            collection.updateOne({ id: newBuilding.id }, newBuilding, function(err, res) {
                if (err) throw err;
            });
        });
    });
}

// to be continued

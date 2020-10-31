const mongo = require('mongodb');

async function main() {
    const url = "mongodb + srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
    const client  = new MongoClient(url);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await listDatabases(client);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);

// to be continued

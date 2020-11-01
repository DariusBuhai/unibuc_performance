const url = "mongodb+srv://unibuc_performance:smarthack_2020@cluster0.lsba1.mongodb.net/Cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

async function foo() {
  let db = await MongoClient.connect(url);
  let dbo = db.db("smarthack");
  let collection = dbo.collection("Balls");
  balls = await collection.find({}).toArray();

  for (ball of balls) {
    let sus = Boolean(Math.random() < 0.5);
    let capacity;
    if (sus) {
      capacity = ball.capacity + parseInt(Math.random() * Math.sqrt(ball.maxCapacity - ball.capacity));
    }
    else {
      capacity = ball.capacity - parseInt(Math.random() * Math.sqrt(ball.capacity));
    }

    await collection.updateOne({_id: ball._id}, {$set: {capacity: capacity}});
  }
}

setInterval(foo, 1000);

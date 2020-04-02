const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

// middleware
app.use(cors());
app.use(bodyParser.json());
const uri = "mongodb://localhost:27017/myproject";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Get users route
const users = ["jahed", "tarek", "nuruddin", "romjan"];
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const name = users[id];
  res.send({ id, name });
});

// Post user email and password route
app.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);
  client.connect(err => {
    const collection = client.db("onlineStore").collection("users");
    collection.insertOne(user, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          error: "database inside error",
          message: err
        });
      } else {
        res.send(result.ops[0]);
      }
    });
    console.log("database connect.......haa");
    // client.close();
  });
});

app.listen(3000, () => console.log("my sever port: 3000"));

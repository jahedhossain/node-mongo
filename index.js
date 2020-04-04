const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ["Asad", "Moin", "Sabed", "Susmita", "Sohana", "Sabana"];

app.get("/products", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    collection
      .find()
      .limit(10)
      .toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });
    client.close();
  });
});

app.get("/product/:key", (req, res) => {
  const key = req.params.key;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    collection.find({ key }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents[0]);
      }
    });
    client.close();
  });
});

app.post("/productKey", (req, res) => {
  const key = req.params.key;
  const productKey = req.body;
  console.log(productKey);
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    collection.find({ key: { $in: productKey } }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });
    client.close();
  });
});
//delete
//update
// post
app.post("/addProduct", (req, res) => {
  const product = req.body;
  console.log(product);
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    collection.insert(product, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});

app.post("/placeOrder", (req, res) => {
  const orderDetails = req.body;
  orderDetails.orderTime = new Date();
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("orders");
    collection.insertOne(orderDetails, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listenting to port ${port}`));

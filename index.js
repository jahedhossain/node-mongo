const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const users = ["jahed", "tarek", "nuruddin", "romjan"];
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const name = users[id];
  res.send({ id, name });
});

app.post("/addUser", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => console.log("my sever port: 3000"));

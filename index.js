const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => res.send("Hellofaf World!"));

app.get("/users", (req, res) => {
  res.send([
    {
      name: "jahid",
      age: 10,
      hobby: "football"
    },
    {
      name: "tarek",
      age: 20,
      hobby: "cricket"
    }
  ]);
});

const users = ["jahed", "tarek", "nuruddin", "romjan"];
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const name = users[id];
  res.send({ id, name });
});

app.listen(3000, () => console.log("my sever port: 3000"));

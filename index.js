const express = require("express");
const app = express();

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

app.listen(3000, () => console.log("my sever port: 3000"));

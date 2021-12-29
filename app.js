const express = require("express");
const app = express();

app.use(express.json());
app.use(express.text());
app.get("/", (req, res) => {
  res.send("Hellow Pipeline!!!!!");
});

app.get("/test", (req, res) => {
  res.send("test for pipeline");
});
app.listen(80, () => console.log("localhost:80 change opened!!"));

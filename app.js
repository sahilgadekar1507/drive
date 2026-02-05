const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.views.ejs");
});

app.listen(3000, () => {
  console.log("Sever is running on port 3000");
});

//include package we need
const express = require("express");
const exphbs = require("express-handlebars");

const restaurantList = require("./restaurant.json")

//define variables
const port = 3000;
const app = express();

//configure template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static file
app.use(express.static("public"));

//root route
app.get("/", (req, res) => {
  res.render("index", { restaurant : restaurantList.results})
})

//activate and listen
app.listen(port, () => {
  console.log("OK")
})
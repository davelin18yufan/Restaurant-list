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
  res.render("index", { restaurant: restaurantList.results })
})

//show route
// : params
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id === Number(req.params.id))
  res.render("show", { restaurant });
})

//search route
// ? query
app.get("/search", (req, res) => {
  const restaurantSearch = restaurantList.results.filter(item => item.name.toLowerCase().toString().includes(req.query.keyword.toLowerCase()) || item.category.toLowerCase().toString().includes(req.query.keyword));
   res.render("index", { restaurant: restaurantSearch, keyword:req.query.keyword })
})

//activate and listen
app.listen(port, () => {
  console.log("OK")
})
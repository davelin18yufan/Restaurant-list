//include package we need
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose")
// const restaurantList = require("./restaurant.json")

const Restaurants = require("./models/schema.js")
//define variables
const port = 3000;
const app = express();

//dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//configure template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static file
app.use(express.static("public"));

//mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection
db.once("open", () => {
  console.log("database connected")
})

db.on("error", () => {
  console.log("connected failed")
})

//root route
app.get("/", (req, res) => {
  return Restaurants.find()
    .lean()
    .then(restaurant => {
      return res.render("index", { restaurant })
    })
    .catch(error => console.log(error))
  // res.render("index", { restaurant: restaurantList.results })
})

//show route
// : params
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return Restaurants.find({id: id})
    .lean()
    .then(restaurant => {
      return res.render("show", { restaurant: restaurant[0] })
    })
    .catch(error => console.log(error))

  // const restaurant = restaurantList.results.find(item => item.id === Number(req.params.id))
  // res.render("show", { restaurant });
})

//search route
// ? query => get
// ?  body => post
app.get("/search", (req, res) => {
  const searchValue = req.query.keyword
  return Restaurants.find()
    .lean()
    .then(restaurant => {
      const restaurantSearch = 
        restaurant.filter(item => item.name.toLowerCase().toString().includes(searchValue.toLowerCase()) || item.category.toLowerCase().toString().includes(searchValue.toLowerCase()));
      return restaurantSearch
    })
    .then(restaurant => res.render("index", { restaurant }))
    .catch(error => console.log(error))
   
  // res.render("index", { restaurant: restaurantSearch, keyword: req.query.keyword })
})

//activate and listen
app.listen(port, () => {
  console.log("OK")
})
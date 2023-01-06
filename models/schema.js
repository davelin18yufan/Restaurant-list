const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_en: { type: String },
  category: { type: String },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: { type: String },
  google_map: {
    type: String,
    required: true
  },
  rating: { type: Number },
  description: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model("restaurants", restaurantSchema) 
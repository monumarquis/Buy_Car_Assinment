const express = require("express");
const {
  uploadCar,
  getAlloldCars,
  UpdateOldCar,
  deleteOldCar,
} = require("../controllers/oldCarController");
const app = express.Router();

app.post("/", uploadCar);

app.get("/", getAlloldCars);

app.patch("/:id", UpdateOldCar);

app.delete("/:id", deleteOldCar);

module.exports = app;

const express = require("express");
const {
  uploadCar,
  getAlloldCars,
  UpdateOldCar,
  deleteOldCar,
  getSingleOldCar,
} = require("../controllers/oldCarController");
const app = express.Router();

app.post("/", uploadCar);

app.get("/", getAlloldCars);

app.get("/Single/:id", getSingleOldCar);

app.patch("/:id", UpdateOldCar);

app.delete("/:id", deleteOldCar);

module.exports = app;

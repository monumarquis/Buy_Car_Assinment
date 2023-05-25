const express = require("express");
const { uploadCar, getAlloldCars } = require("../controllers/oldCarController");
const app = express.Router();

app.post("/", uploadCar);

app.get("/", getAlloldCars);

module.exports = app;

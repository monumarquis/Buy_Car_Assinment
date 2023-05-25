const express = require("express");
const { getAllOEMCars, FilterOEMcars } = require("../controllers/oem_specs");
const app = express.Router();


// All cars Route
app.get("/", getAllOEMCars);

// Search cars by name Route
app.get("/search", FilterOEMcars);

module.exports = app;

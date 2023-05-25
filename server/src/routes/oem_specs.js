const express = require("express");
const oemModel = require("../models/oem_specs");
const app = express.Router();

// All cars Route
app.get("/", async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  try {
    const x = await oemModel.find();
    const allCars = await oemModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res
      .status(200)
      .send({ cars: allCars, totalPages: Math.round(x.length / 8) });
  } catch (err) {
    console.log(err);
    return res.status(501).send(err);
  }
});
// Search cars by name Route
app.get("/search", async (req, res) => {
  const { name, manufacturer, year } = req.query;
  console.log({ name, manufacturer, year });
  try {
    let query = {
      $and: [{ manufacturer: { $regex: manufacturer, $options: "i" } }],
    };

    if (name) {
      query.$and.push({ name:  { $regex: name, $options: "i" } });
    }
    if (year) {
      query.$and.push({ year: parseInt(year) });
    }
    console.log(query);
    const carData = await oemModel.find(query);
    // Search for matching cars

    return res.status(200).send({
      cars: carData,
      totalPages: Math.round(carData.length / 8),
    });
  } catch (err) {
    console.log(err);
    return res.status(501).send(err);
  }
});

module.exports = app;

const oemModel = require("../models/oem_specs");

const getAllOEMCars = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  try {
    const x = await oemModel.find();
    const allCars = await oemModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res
      .status(200)
      .send({ cars: allCars, totalPages: Math.ceil(x.length / 9) });
  } catch (err) {
    console.log(err);
    return res.status(501).send(err);
  }
};
const FilterOEMcars = async (req, res) => {
  const { name, manufacturer, year, page = 1 } = req.query;
  console.log({ name, manufacturer, year });
  try {
    let query = {
      $and: [{ manufacturer: { $regex: manufacturer, $options: "i" } }],
    };

    if (name) {
      query.$and.push({ name: { $regex: name, $options: "i" } });
    }
    if (year) {
      query.$and.push({ year: parseInt(year) });
    }
    console.log(query);
    const carData = await oemModel
      .find(query)
      .skip((page - 1) * 9)
      .limit(9);
    // Search for matching cars

    return res.status(200).send({
      cars: carData,
      totalPages: Math.ceil(carData.length / 8),
    });
  } catch (err) {
    console.log(err);
    return res.status(501).send(err);
  }
};

module.exports = { getAllOEMCars, FilterOEMcars };

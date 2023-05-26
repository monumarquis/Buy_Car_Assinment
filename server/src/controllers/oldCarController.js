require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const oldCarModel = require("../models/oldCar");
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  upload_preset: "Instagaram_Media",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        // console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCar = async (req, res) => {
  console.log(req.body);
  try {
    const {
      imageUrl,
      userId,
      title,
      odometerDistance,
      totalAccident,
      color,
      totalBuyers,
      registrationPlace,
      mileage,
      price,
    } = req.body;
    if (!imageUrl || !userId)
      return res.status(404).send({ message: "Please Select Image" });
    if (
      !title ||
      !odometerDistance ||
      !totalAccident ||
      !color ||
      !totalBuyers ||
      !registrationPlace ||
      !mileage ||
      !price
    ) {
      return res.status(404).send({ message: "Please Fill all the Details" });
    }
    uploadImage(imageUrl)
      .then(async (url) => {
        let car = await oldCarModel({
          user: userId,
          img: url,
          title,
          odometerDistance,
          totalAccident,
          color,
          totalBuyers,
          registrationPlace,
          mileage,
          price,
        });
        car.save();
        return res.status(201).send({ message: "Car Added Succesfully" });
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getAlloldCars = async (req, res) => {
  const { page = 1, limit = 9, color, mileage, price } = req.query;
  console.log(mileage);
  const aboveMileage = parseInt(mileage);
  let mileageQuery = {};
  mileageQuery.mileage = { $regex: `${aboveMileage}kms`, $options: "i" };
  try {
    const x = await oldCarModel.find();
    const allCars = await oldCarModel
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

const deleteOldCar = async (req, res) => {
  let { id } = req.params;
  console.log(id);

  try {
    let doc = await oldCarModel.deleteOne({ _id: id });
    return res
      .status(201)
      .send({ message: "Your Listed Cars Deleted Successfully" });
  } catch (error) {
    return res.status(401).send(error);
  }
};

const UpdateOldCar = async (req, res) => {
  let {
    user,
    imageUrl,
    title,
    odometerDistance,
    totalAccident,
    color,
    totalBuyers,
    registrationPlace,
    mileage,
    price,
    isFileUploaded,
  } = req.body;
  const { id } = req.params;
  console.log(isFileUploaded);

  try {
    if (isFileUploaded) {
      uploadImage(imageUrl)
        .then(async (url) => {
          let car = await oldCarModel.findOneAndUpdate(
            { _id: id, user },
            {
              $set: {
                img: url,
                title: title,
                odometerDistance: odometerDistance,
                totalAccident: totalAccident,
                color: color,
                totalBuyers: totalBuyers,
                registrationPlace: registrationPlace,
                mileage: mileage,
                price: price,
              },
            },
            {
              new: true,
            }
          );
          return res.status(201).send({ message: "Car Added Succesfully" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ message: err.message });
        });
    } 
    else {
      let doc = await oldCarModel.findOneAndUpdate(
        { _id: id, user },
        {
          $set: {
            title: title,
            odometerDistance: odometerDistance,
            totalAccident: totalAccident,
            color: color,
            totalBuyers: totalBuyers,
            registrationPlace: registrationPlace,
            mileage: mileage,
            price: price,
          },
        },
        {
          new: true,
        }
      );
      // console.log(doc);

      return res
        .status(201)
        .send({ message: "Your Informtion Updated Successfully" });
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};

const getSingleOldCar = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    let doc = await oldCarModel.findOne({ _id: id });
    // console.log(doc);
    return res.status(201).send({ carData: doc });
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = {
  uploadCar,
  getAlloldCars,
  deleteOldCar,
  UpdateOldCar,
  getSingleOldCar,
};

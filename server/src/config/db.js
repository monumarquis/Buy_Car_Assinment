require("dotenv").config();
const mongoose = require("mongoose");

async function connect() {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.DB_URL);
}

module.exports = connect;
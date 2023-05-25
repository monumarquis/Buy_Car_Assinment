require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const app = express();
const User = require("./routes/user");
const Oem = require("./routes/oem_specs");
const oldCars = require("./routes/oldCar");

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use("/users", User);
app.use("/cars", Oem);
app.use("/oldCars", oldCars);

app.get("/", (req, res) => {
  res.send("This is  Home Route");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`app running on http://localhost:${PORT}`);
});

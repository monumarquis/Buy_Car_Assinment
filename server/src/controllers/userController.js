const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;

// user Register  Route Logic
const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(403).send({ message: "Please Enter All Credential" });

  const exsist = await userModel.findOne({ email });
  if (exsist)
    return res
      .status(404)
      .send({ message: "User Already Created Try Logging in" });

  const hash = bcrypt.hashSync(password, 10);
  console.log(hash);
  const user = await userModel({ name, email, password: hash });
  user.save();

  return res
    .status(201)
    .send({ user, message: "You have Signup Successfully" });
};

// user Login  Route Logic
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(403).send({ message: "Please Enter All Credentials" });
  }
  let User = await userModel.findOne({ email });
  if (!User)
    return res
      .status(403)
      .send({ message: "Invalid Details! User Not Found " });
  //    console.log(User)
  try {
    const match = bcrypt.compareSync(password, User.password);
    console.log(match);
    if (match) {
      //login
      const token = jwt.sign(
        {
          _id: User._id,
          name: User.name,
          email: User.email,
          password: User.password,
        },
        SECRET_TOKEN,
        {
          expiresIn: "7 days",
        }
      );
      return res
        .status(200)
        .send({ message: "Login Successfull", token, id: User._id });
    } else {
      return res.status(401).send({ message: "Password is Incorrect" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Invalid Credentials" });
  }
};

module.exports = { userSignup, userLogin };

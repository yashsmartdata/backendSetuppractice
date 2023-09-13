const UserSchema = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    res.send({ error: "Please fill all the fields" });
  } else {
    if (password !== confirmPassword) {
      res.send({
        error: "Password and Confirm Password value should be same.",
      });
    } else {
      const checkEmail = await UserSchema.findOne({ email: email });
      if (!checkEmail) {
        const register = new UserSchema({
          firstName,
          lastName,
          email,
          password: await bcrypt.hash(password, 12),
        });
        const token = jwt.sign({ email }, process.env.SECRET);
        await register.save();
        res.status(201).send({ message: "Registered Successfully", token });
      } else {
        res.send({ error: "Email already registred with us." });
      }
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const checkEmail = await UserSchema.findOne({ email: email });
  if (checkEmail) {
    const token = jwt.sign({ email }, process.env.SECRET);
    const comparePaswword = await bcrypt.compare(password, checkEmail.password);
    if (comparePaswword) {
      res.status(200).send({ message: "Logged in Successful", token });
    } else {
      res.send({ error: "Invalid details" });
    }
  } else {
    res.send({ error: "Invalid details" });
  }
};

const getdata = async (req, res) => {
  res.send("good to go.");
};

module.exports = { getdata, register, login };

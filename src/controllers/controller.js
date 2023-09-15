import UserSchema from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.chatgptkey,
});
export const register = async (req, res) => {
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

export const login = async (req, res) => {
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

export const getdata = async (req, res) => {
  res.send("good to go.");
};

export const chatGPT = async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_token: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion?.data?.choices[0]?.text);
};

// module.exports = { getdata, register, login, chatGPT };

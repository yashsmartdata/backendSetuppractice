import UserSchema from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Openai from "openai";
import textract from "textract";

const openai = new Openai({
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
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.", // This sets the behavior of the assistant
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 2000,
  });
  // console.log(completion.choices[0].message,"........dsgdf......")
  const chatGPTResponse = completion.choices[0].message.content;
  res.send(chatGPTResponse);
};

export const extracttext = async (req, res) => {
  const filePath = "src/controllers/Screenshot 2023-09-18 at 2.57.10 PM.png";
  // Extract text from the file
  const options = {
    ext: '.png', // Replace with the desired file extension
  };
  textract.fromFileWithPath(filePath, options, function (error, text) {
    if (error) {
      console.error("Error extracting text:", error);
    } else {
      console.log("Extracted text:", text);
    }
  });
};

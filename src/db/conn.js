import mongoose from "mongoose";
const db = process.env.MONGODB;
console.log("running", db);
mongoose
  .connect(db)
  .then(() => {
    console.log("connection is good");
  })
  .catch((err) => {
    console.log("error", err);
  });

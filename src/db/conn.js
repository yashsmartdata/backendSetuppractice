const mongoose = require("mongoose");
const db = process.env.MONGODB;
mongoose
  .connect(db)
  .then(() => {
    console.log("connection is good");
  })
  .catch((err) => {
    console.log("error", err);
  });

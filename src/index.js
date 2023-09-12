const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
require("./db/conn");
const Router = require("./routes/router");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);
app.listen(port, () => {
  console.log(`listening port ${port}`);
});

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
import 'dotenv/config';
import "./db/conn.js";
import Router from "./routes/router.js";
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);
app.listen(port, () => {
  console.log(`listening port ${port}`);
});

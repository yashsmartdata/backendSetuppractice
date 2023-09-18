import express from "express";
import {
  getdata,
  register,
  login,
  chatGPT,
  extracttext,
} from "../controllers/controller.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get("/get", auth, getdata);
router.post("/register", register);
router.post("/login", login);
router.post("/chatGPT", chatGPT);
router.post("/extracttext", extracttext);
export default router;
// module.exports = router;

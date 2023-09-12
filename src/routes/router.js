const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/controller");
const auth = require("../middlewares/auth");

router.get("/get", auth, ctrl.getdata);
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
module.exports = router;

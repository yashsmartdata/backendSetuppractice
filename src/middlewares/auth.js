const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.query.token;
    const verifyToken = jwt.verify(token, process.env.SECRET);
    if (!verifyToken) {
      res.send({ error: "You are not authrized person" });
    }
    next();
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

module.exports = auth;

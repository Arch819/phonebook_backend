const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [Bearer, token] = authorization.split(" ");
  if (Bearer !== "Bearer") {
    res.status(401).json({ message: "No authorized" });
    return;
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  try {
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      res.status(401).json({ message: "No authorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "No authorized" });
  }
};

module.exports = authenticate;

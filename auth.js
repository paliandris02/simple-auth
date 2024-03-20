const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./jwt-const");
const authenticate = (req, res, next) => {
  const Authorization = req.cookies.jwt;
  if (!Authorization) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(Authorization, JWT_SECRET, (err, decoded) => {
      if (error) {
        throw error;
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

module.exports = authenticate;

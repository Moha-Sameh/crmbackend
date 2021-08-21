const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verfiy = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verfiy;
    next();
  } catch (error) {
    res.json({
      message: "Authentication failed!",
    });
  }
};

module.exports = authenticated;

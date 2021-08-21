const USER = require("../model/User.Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Method: Register
 * Purpose: This API used to Register user
 * @param {*} req
 * @param {*} res
 */

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedpassword) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new USER({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: hashedpassword,
    });
    user
      .save()
      .then((user) => {
        res.status(200).json({
          message: "User successfully registered",
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "An error occured",
        });
      });
  });
};

/**
 * Method: Login
 * Purpose: This API used to Login user
 * @param {*} req
 * @param {*} res
 */

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  USER.findOne({ $or: [{ email: username }, { username }] })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            const payload = {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              exp: Date.now() + parseInt(process.env.JWT_EXPIRATION),
            };
            let token = jwt.sign(
              JSON.stringify(payload),
              process.env.JWT_SECRET
            );
            res.json({
              message: "Login Successful",
              token,
            });
          } else {
            res.json({
              message: "Password does not match",
            });
          }
        });
      } else {
        res.json({
          message: "Invalid user input",
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};

module.exports = {
  register,
  login,
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../auth");


exports.register = (req, res, next) => {
  const { email, password, isAdmin } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  User.findOne({ email })
    .then((existing) => {
      if (existing) {
        return res.status(400).json({ message: "Email already registered" });
      }


      return bcrypt.hash(password, 10);
    })
    .then((hashed) => {
      if (!hashed) return; 
      return User.create({
        email,
        password: hashed,
        isAdmin: !!isAdmin,
      });
    })
    .then((created) => {
      if (!created) return;
      res.status(201).json({ message: "Registered Successfully" });
    })
    .catch(next);
};


exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let foundUser = null;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: foundUser._id.toString(), isAdmin: foundUser.isAdmin },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ access: token });
    })
    .catch(next);
};

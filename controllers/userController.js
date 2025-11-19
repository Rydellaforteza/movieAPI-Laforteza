const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../auth");

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
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
        name,
        email,
        password: hashed,
        isAdmin: false        
    })
    .then((created) => {
      if (!created) return;
      res.status(201).json({ message: "Registered Successfully" });
    })
    .catch(next);
};

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("register.views.ejs");
});

router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        errors: errors.array(),
        message: "Invalid Datails!",
      });
    }

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json(newUser);
  },
);

router.get("/login", (req, res) => {
  res.render("login.views.ejs");
});

router.post(
  "/login",
  body("username").trim().isLowercase().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "invalid data!",
      });
    }

    const { username, password } = req.body;

    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      return res.status(400).json({
        message: "invalid Username or password!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "invalid Username or Password!",
      });
    }

    res.send("logged in!");
  },
);

module.exports = router;

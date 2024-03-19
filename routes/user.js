const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Users = require("../mockDD");
const User = require("../model/userModel");
const UsersDB = new Users();

router.get("/", async (req, res) => {
  res.status(200).send("User endpoint");
});

router.get("/getAll", [], async (req, res) => {
  try {
    res.json({
      Users: UsersDB.getAll(),
    });
  } catch (error) {
    res.status(500).send("Error at query");
  }
});

router.post("/signup", [], async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = UsersDB.findOneByUser(username);
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User(username, email, password);
    UsersDB.addUser(user);

    user = UsersDB.findOneByUser(username);
    const payload = {
      user: {
        id: user.getId(),
      },
    };

    jwt.sign(payload, "randomString", { expiresIn: 1000 }, (err, token) => {
      if (err) throw err;
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res.status(200).json({
        token,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error at signup");
  }
});

router.post("/login", async (req, res) => {
  try {
    res.send(req.cookies.jwt);
  } catch (error) {}
});
module.exports = router;

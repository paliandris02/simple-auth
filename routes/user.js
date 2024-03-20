const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Users = require("../mockDD");
const User = require("../model/userModel");
const UsersDB = new Users();
const { compare } = require("bcryptjs");
const JWT_SECRET = require("../jwt-const");

router.get("/", async (req, res) => {
  const Authorization = req.cookies.jwt;
  if (!Authorization) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  const decoded = jwt.verify(Authorization, JWT_SECRET);
  req.user = decoded.user.id;

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

    res.status(200).send("Sign up was succesfull, now log in.");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error at signup");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Invalid credentials.");
    return;
  }

  user = UsersDB.findOneByUser(username);

  const payload = {
    user: {
      id: user.getId(),
    },
  };

  if (!user) {
    res.status(400).send(`User ${username} not found.`);
    return;
  }

  if (!compare(password, user.getHashedPassword())) {
    res.status(400).send("Invalid password.");
    return;
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res
    .cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 })
    .send("Login was succesfull.");
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt").send("Logout was succesful.");
  } catch (error) {}
});
module.exports = router;

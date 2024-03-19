const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ response: "API running" });
});

app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server started on ${PORT}`);
});

require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sequelize = require("./config/database");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const pengaduanRouter = require("./routes/pengaduan");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/pengaduan", pengaduanRouter);

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ message: "Not Found" });
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;

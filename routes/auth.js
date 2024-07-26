const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Mahasiswa = require("../models/mahasiswa");
const Staff = require("../models/staff");
require("dotenv").config();

// Mahasiswa Register
router.post("/register", async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const newMahasiswa = await Mahasiswa.create({ nama, email, password });
    res.status(201).json(newMahasiswa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mahasiswa Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const mahasiswa = await Mahasiswa.findOne({ where: { email } });

  if (mahasiswa && bcrypt.compareSync(password, mahasiswa.password)) {
    const accessToken = jwt.sign(
      { id: mahasiswa.idMahasiswa, role: "mahasiswa" },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Email or password is incorrect" });
  }
});

// Staff Register
router.post("/staff/register", async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const newStaff = await Staff.create({ nama, email, password });
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Staff Login
router.post("/staff/login", async (req, res) => {
  const { email, password } = req.body;
  const staff = await Staff.findOne({ where: { email } });

  if (staff && bcrypt.compareSync(password, staff.password)) {
    const accessToken = jwt.sign(
      { id: staff.idStaff, role: "staff" },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Email or password is incorrect" });
  }
});

module.exports = router;

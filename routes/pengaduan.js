const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const authorizeStaff = require("../middleware/authorizeStaff");
const Pengaduan = require("../models/pengaduan");
const Mahasiswa = require("../models/mahasiswa");

// Mahasiswa Kirim Pengaduan
router.post("/", authenticateToken, async (req, res) => {
  const { judul, deskripsi, kategori } = req.body;
  const { id } = req.user;

  try {
    const pengaduan = await Pengaduan.create({
      idMahasiswa: id,
      judul,
      deskripsi,
      kategori,
    });
    res.status(201).json(pengaduan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mahasiswa Lihat Pengaduan
router.get("/", authenticateToken, async (req, res) => {
  const { id } = req.user;

  try {
    const pengaduans = await Pengaduan.findAll({
      where: { idMahasiswa: id },
    });
    res.json(pengaduans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Staff Lihat Semua Pengaduan
router.get("/all", authenticateToken, authorizeStaff, async (req, res) => {
  try {
    const pengaduans = await Pengaduan.findAll({ include: Mahasiswa });
    res.json(pengaduans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Staff Perbarui Status Pengaduan
router.put(
  "/:id/status",
  authenticateToken,
  authorizeStaff,
  async (req, res) => {
    const { id } = req.params;
    const { status, tanggapan } = req.body;

    try {
      const pengaduan = await Pengaduan.findByPk(id);
      if (!pengaduan) {
        return res.status(404).json({ message: "Pengaduan not found" });
      }

      pengaduan.status = status;
      pengaduan.tanggapan = tanggapan;
      await pengaduan.save();

      res.json(pengaduan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;

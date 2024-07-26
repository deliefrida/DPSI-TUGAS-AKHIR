const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Mahasiswa = require("./mahasiswa");

const Pengaduan = sequelize.define("Pengaduan", {
  idPengaduan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idMahasiswa: {
    type: DataTypes.INTEGER,
    references: {
      model: Mahasiswa,
      key: "idMahasiswa",
    },
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggalPengaduan: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("Diproses", "Ditindaklanjuti", "Diselesaikan"),
    defaultValue: "Diproses",
  },
  tanggapan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Pengaduan.belongsTo(Mahasiswa, { foreignKey: "idMahasiswa" });

module.exports = Pengaduan;

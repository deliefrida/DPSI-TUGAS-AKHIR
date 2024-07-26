const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Mahasiswa = sequelize.define("Mahasiswa", {
  idMahasiswa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue("password", hashedPassword);
    },
  },
  statusVerifikasi: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Mahasiswa;

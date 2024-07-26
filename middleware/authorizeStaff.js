// Middleware untuk mengautorisasi pengguna dengan peran 'staff'
function authorizeStaff(req, res, next) {
  // Memeriksa apakah peran pengguna dalam request adalah 'staff'
  if (req.user.role !== "staff") {
    // Jika bukan 'staff', kembalikan status 403 (Forbidden) dengan pesan "Access denied"
    return res.status(403).json({ message: "Access denied" });
  }
  // Jika peran adalah 'staff', lanjutkan ke middleware berikutnya
  next();
}

// Mengekspor middleware untuk digunakan di tempat lain
module.exports = authorizeStaff;

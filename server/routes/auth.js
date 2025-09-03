// server/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// --- Kayıt ---
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ error: "Tüm alanlar zorunlu" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(400).json({ error: "E-posta veya kullanıcı adı zaten kullanılıyor" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const u = await User.create({
      firstName, lastName, username, email, password: hashed,
    });

    req.session.userId = u._id; // oturum başlat
    res.json({ ok: true, user: { id: u._id, username: u.username, email: u.email } });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// --- Giriş ---
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body || {};
    const identifier = (email || "").trim();
    password = password || "";

    if (!identifier || !password) {
      return res.status(400).json({ error: "E-posta/kullanıcı adı ve şifre gerekli" });
    }

    const query = identifier.includes("@")
      ? { email: identifier.toLowerCase() }
      : { username: identifier };

    const user = await User.findOne(query);
    if (!user) return res.status(401).json({ error: "Geçersiz bilgiler" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Geçersiz bilgiler" });

    req.session.userId = user._id;
    res.json({ ok: true, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// --- Çıkış ---
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

module.exports = router;
// --- Oturum açmış kullanıcının bilgileri ---
router.get("/me", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Giriş gerekli" });
  const user = await User.findById(req.session.userId).select("firstName lastName username email");
  res.json(user);
});

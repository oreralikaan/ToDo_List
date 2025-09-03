// server/routes/tasks.js
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// --- Middleware: giriş kontrolü ---
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Giriş gerekli" });
  }
  next();
}

// --- Görev ekle ---
router.post("/", requireLogin, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Metin zorunlu" });

    const t = await Task.create({ userId: req.session.userId, text });
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// --- Görevleri listele ---
router.get("/", requireLogin, async (req, res) => {
  try {
    const filter = req.query.filter || "all";
    let q = { userId: req.session.userId };

    if (filter === "done") q.done = true;
    if (filter === "todo") q.done = false;

    const tasks = await Task.find(q).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// --- Görev güncelle (tamamla/geri al) ---
router.put("/:id", requireLogin, async (req, res) => {
  try {
    const { done } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { done },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
// --- Görev sil ---
router.delete("/:id", requireLogin, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

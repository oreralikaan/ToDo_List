// server/server.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();

// --- MongoDB ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB bağlandı"))
  .catch((e) => console.error("❌ MongoDB hata:", e));

// --- Orijin (CORS) ---
app.use(cors({ origin: true, credentials: true }));

// --- Body parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Session ---
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 gün
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// --- Statik dosyalar ---
app.use(express.static(path.join(__dirname, "..", "public")));

// --- Basit sağlık kontrolü ---
app.get("/api/health", (req, res) => {
  res.json({ ok: true, now: new Date().toISOString() });
});

// --- Router'ları sonra ekleyeceğiz ---
// --- Router'ları ekle ---
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tasks");
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);


// --- Server start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server hazır: http://localhost:${PORT}`));

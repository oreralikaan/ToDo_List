// server/models/Task.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text:   { type: String, required: true, trim: true },
    done:   { type: Boolean, default: false },   // <— BURADA VİRGÜL VAR!
    level:  { type: String, enum: ["Düşük Öncelik", "Orta Öncelik", "Yüksek Öncelik"], default: "Orta Öncelik" }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);

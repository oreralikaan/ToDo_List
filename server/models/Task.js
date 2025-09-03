// server/models/Task.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text:   { type: String, required: true, trim: true },
    done:   { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);

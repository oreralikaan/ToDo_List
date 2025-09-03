// server/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    username:  { type: String, required: true, unique: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true } // bcrypt ile hashleyeceğiz
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

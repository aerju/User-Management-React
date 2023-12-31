const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imgUrl: {
      data: Buffer,
      contentType: String
    }
  },
  {
    collection: "user-info",
  }
);

const model = mongoose.model("userInfo", User);

module.exports = model;

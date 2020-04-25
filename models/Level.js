const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LevelSchema = new Schema({
  level: {
    type: Number,
    required: true,
  },
  question_ids: [Number],
});

module.exports = Level = mongoose.model("level", LevelSchema);

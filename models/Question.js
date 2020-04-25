const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    quired: true,
  },
  pcklId: {
    type: Number,
    required: true,
  },
  rootWordId: {
    type: Number,
    required: true,
  },
  tlit: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
  surahnum: {
    type: Number,
    required: true,
  },
  ayahnum: {
    type: Number,
    required: true,
  },
  wordnum: {
    type: Number,
    required: true,
  },
  arabicAyah: {
    type: String,
    required: true,
  },
  rootWord: {
    type: String,
    required: true,
  },
  rootWordType: {
    type: String,
    required: true,
  },
  wazn: {
    type: String,
    required: true,
  },
  waznEnglish: {
    type: String,
    required: true,
  },
  waznTlit: {
    type: String,
    required: true,
  },
  waznType: {
    type: String,
    required: true,
  },
  question_id: {
    type: Number,
    required: true,
  },
});

module.exports = Question = mongoose.model("question", QuestionSchema);

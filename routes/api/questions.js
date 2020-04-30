const express = require("express");
const router = express.Router();

var _ = require("lodash");

// Question model
const Question = require("../../models/Question");
const Level = require("../../models/Level");

// @route   GET api/questions/test
// @desc    test
// @access  Public
router.get("/test", (req, res) => {
  res.json("we here");
});

// @route   GET api/questions/:id
// @desc    Get question by question_id
// @access  Public
router.get("/:id", (req, res) => {
  Question.findOne({ question_id: req.params.id })
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: "No question found with that ID" });
      }
    })
    .catch((err) =>
      res.status(404).json({ nopostfound: "No questions found with that ID" })
    );
});

// @route   GET api/questions/level/:id
// @desc    Get all questions in a level
// @access  Public
router.get("/levels/:id", (req, res) => {
  Level.findOne({ level: req.params.id })
    .then((level) => {
      let question_ids = level.question_ids;
      question_ids = _.sampleSize(question_ids, 100);
      console.log(question_ids.length)
      Question.find({
        question_id: {
          $in: question_ids,
        },
      }).then((questions) => {
        res.json(questions);
      });
    })
    .catch((err) =>
      res.status(404).json({ nopostfound: "No questions found with that ID" })
    );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Question model
const Level = require("../../models/Level");

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "test worked!" });
});

// @route   GET api/levels
// @desc    Get questions
// @access  Public
router.get("/", (req, res) => {
  Level.find()
    .then((questions) => res.json(questions))
    .catch((err) =>
      res.status(404).json({ nopostsfound: "No questions found" })
    );
});

// @route   GET api/level/:id
// @desc    Get a level
// @access  Public
router.get("/:id", (req, res) => {
  Level.findOne({ level: req.params.id })
    .then((level) => {
      if (level) {
        res.json(level.question_ids);
      } else {
        res.status(404).json({ nopostfound: "No question found with that ID" });
      }
    })
    .catch((err) =>
      res.status(404).json({ nopostfound: "No questions found with that ID" })
    );
});

module.exports = router;

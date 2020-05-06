const express = require("express");
const router = express.Router();

var _ = require("lodash");

// Question model
const Question = require("../../models/Question");

// @route   GET api/questions/test
// @desc    test
// @access  Public
router.get("/test", (req, res) => {
    res.json("we here");
});

// @route   GET api/surahs/:id
// @desc    Get questions of a surah by surah num
// @access  Public
router.get("/:id", (req, res) => {
    Question.find({ surahnum: req.params.id })
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

// @route   GET api/surahs/:id
// @desc    Get questions of a surah by surah num and ayah range
// @access  Public
router.get("/:id/:start/:end", (req, res) => {
    let start = parseInt(req.params.start) - 1
    let end = parseInt(req.params.end) + 1
    Question.
        find({ surahnum: req.params.id }).
        where('ayahnum').gt(start).lt(end)
        .then((question) => {
            if (question) {
                console.log(len(question))
                res.json(question)
            } else {
                res.status(404).json({ nopostfound: "No question found with that ID" });
            }
        })
        .catch((err) => {
            res.status(404).json({ nopostfound: "No questions found with that ID" })
        })
    // Question.find({ surahnum: req.params.id })
    //     .then((post) => {
    //         if (post) {
    //             res.json(post);
    //         } else {
    //             res.status(404).json({ nopostfound: "No question found with that ID" });
    //         }
    //     })
    //     .catch((err) =>
    //         res.status(404).json({ nopostfound: "No questions found with that ID" })
    //     );
});


module.exports = router;

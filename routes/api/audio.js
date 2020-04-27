const express = require("express");
const router = express.Router();

export const playAudio = () => {
  return async () => {
    router.get(
      "https://project-zayd-2000.s3.amazonaws.com/audio/114_006_002.mp3",
      async (req, res) => {
        try {
          res.json();
        } catch (error) {
          console.log(error.message);
          res.status(500).send("Server Error");
        }
      }
    );
  };
};
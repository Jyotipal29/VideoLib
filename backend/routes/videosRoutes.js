const express = require("express");
const router = express.Router();
const { protect } = require("../middelwear/authMiddelwear");
const {
  getVideo,

  allVideos,
} = require("../controllers/videoController");

//create a video

router.get("/find/:id", getVideo);
router.get("/", allVideos);

module.exports = router;
 
const express = require("express");
const router = express.Router();
const { protect } = require("../middelwear/authMiddelwear");
const {
  getVideo,

  allVideos,
  like,
} = require("../controllers/videoController");

//create a video

router.get("/find/:id", getVideo);
router.get("/", allVideos);
router.put("/like/:id", protect, like);

module.exports = router;
 
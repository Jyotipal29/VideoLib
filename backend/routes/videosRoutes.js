const express = require("express");
const router = express.Router();
const { protect } = require("../middelwear/authMiddelwear");
const {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  allVideos,
  sub,
  getByTag,
  search,
} = require("../controllers/videoController");

//create a video

// router.post("/", addVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/", allVideos);
router.get("/sub", sub);
router.get("/search", search);
router.get("/tag", getByTag);

module.exports = router;

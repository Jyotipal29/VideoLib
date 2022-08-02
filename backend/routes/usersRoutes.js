const express = require("express");
const { protect } = require("../middelwear/authMiddelwear");
const router = express.Router();
const {
  update,
  deleteUser,
  getUser,
  subscribe,
  unSubscrie,
  like,
  disLike,
} = require("../controllers/userController");

//update user
router.put("/:id", protect, update);

//delete user
router.delete("/:id", protect, deleteUser);
//get a user
router.get("/find/:id", getUser);
//subscribe a user
router.put("/sub/:id", protect, subscribe);
//unsubscribe
router.put("/unsub/:id", protect, unSubscrie);
//like a vidio
router.put("/like/:videoId", protect, like);

//dislike a video
router.put("/dislike/:videoId", protect, disLike);

module.exports = router;

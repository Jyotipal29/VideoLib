const express = require("express");
const { protect } = require("../middelwear/authMiddelwear");
const router = express.Router();
const {
  update,
  deleteUser,
  getUser,
  subscribe,
  unSubscrie,
  getLiked,
} = require("../controllers/userController");

//update user
router.put("/:id", update);

//delete user
router.delete("/:id", deleteUser);
//get a user
router.get("/find/:id", getUser);
//subscribe a user
router.put("/sub/:id", subscribe);
//unsubscribe
router.put("/unsub/:id", unSubscrie);

//like a vidio
router.get("/liked", protect, getLiked);


module.exports = router;

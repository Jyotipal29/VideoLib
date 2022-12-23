const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Video = require("../models/Video");
const VideoLike = require("../models/VideoLike");
const { post } = require("../routes/authRoutes");
const update = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(403);
    throw new Error("you can only update ur  account");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } else {
    res.status(403);
    throw new Error("you can only delete ur  account");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("ur not there");
  }
});

//visit this agin understand it properly// git in now
const subscribe = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: {
      subscribedUsers: req.params.id,
    },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: {
      subscribers: 1,
    },
  });
  res.status(200).json("subscription succesful");
});

const unSubscrie = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      subscribedUsers: req.params.id,
    },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: {
      subscribers: -1,
    },
  });
  res.status(200).json("unsubscription succesful");
});

const getLiked = async (req, res) => {
  try {
    const userid = req.user._id;
    const likes = await VideoLike.find({
      user: userid,
    }).populate("video");

    let user = await User.findById(userid);
    const videos = likes.map((like) => like.video.toObject());

    // console.log("fetch videos called", videos);

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unSubscrie,
  getLiked,
};
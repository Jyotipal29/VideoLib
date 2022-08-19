const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Video = require("../models/Video");
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
    $push: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: 1 },
  });
  res.status(200).json("subscription succesful");
});

const unSubscrie = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: -1 },
  });
  res.status(200).json("unsubscription succesful");
});

const like = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const video = await Video.findByIdAndUpdate(videoId, {
    $addToSet: { likes: req.user._id },
    $pull: { dislikes: req.user._id },
  });
  res.status(200).json({
    status: "success",
    data: {
      video,
    },
  });
});

const disLike = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  const video = await Video.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: id },
    $pull: { likes: id },
  });
  res.status(200).json({
    status: "success",
    data: {
      video,
    },
  });
});

module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unSubscrie,
  like,
  disLike,
};

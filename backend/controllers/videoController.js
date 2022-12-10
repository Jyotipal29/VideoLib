const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Video = require("../models/Video");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

const getVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id, "id");
  const video = await Video.findById(ObjectId(id));
  console.log(video, "video");
  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404).json({ message: "video not found" });
  }
});

const allVideos = asyncHandler(async (req, res) => {
  let query = {};
  const tag = req.query.tag;
  if (tag && ![null, "null"].includes(tag)) {
    query.tag = {
      $in: [tag],
    };
  }
  const videos = await Video.find(query);
  res.status(201).json(videos);
});
const like = async (req, res) => {
  const { id } = req.params;
  if (!req.user.id) return res.json({ message: "unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no video with the id");

  const video = await Video.findById(id);
  console.log(video, "video is this ");
  const index = video.likes.findIndex(
    (id) => id.toString() === req.user.id.toString()
  );
  if (index === -1) {
    //like
    video.likes.push(req.user.id);
    // console.log("liked");
  } else {
    //dislike
    // console.log(video.likes, "likes video");
    video.likes = video.likes.filter(
      (id) => id.toString() != req.user.id.toString()
    );
    // video.likes = video.likes.filter(
    //   (id) => id.toString() != req.user.id.toString())
    // );
  }
  const updatedVideo = await Video.findByIdAndUpdate(id, video, { new: true });
  res.json(updatedVideo);
};

module.exports = {
  getVideo,
  allVideos,
  like,
};

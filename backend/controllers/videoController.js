const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Video = require("../models/Video");
const ObjectId = require("mongodb").ObjectId;

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

module.exports = {
  getVideo,

  allVideos,
};

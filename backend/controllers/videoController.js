const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Video = require("../models/Video");

const getVideo = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const video = await Video.findOne({ id });
  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404);
    throw new Error("video not found");
  }
});

const allVideos = asyncHandler(async (req, res) => {
  // const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
  // res.status(200).json(videos);
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

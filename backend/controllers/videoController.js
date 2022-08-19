const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Video = require("../models/Video");
const addVideo = asyncHandler(async (req, res) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  if (newVideo) {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } else {
    res.status(400);
    throw new Error("no video");
  }
});

const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (video) {
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      res.status(403);
      throw new Error("you can upadte only ur video");
    }
  } else {
    res.status(404);
    throw new Error("video not found");
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (video) {
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("the video has been deleted");
    } else {
      res.status(403);
      throw new Error("you can delete only ur video");
    }
  } else {
    res.status(404);
    throw new Error("video not found");
  }
});
const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404);
    throw new Error("video not found");
  }
});

const addView = asyncHandler(async (req, res) => {
  await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  });
  res.status(200).json("the views has been inc");
});

const allVideos = asyncHandler(async (req, res) => {
  const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

  res.status(200).json(videos);
});

const trend = asyncHandler(async (req, res) => {
  // -1 here is the most vied 1 is less viewd
  const videos = await Video.find().sort({ views: -1 });

  res.status(200).json(videos);
});

const sub = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const subscribedChannels = user.subscribedUsers;

  const list = await Promise.all(
    subscribedChannels.map((channelId) => {
      return Video.find({ userId: channelId });
    })
  );
  res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
});

const getByTag = asyncHandler(async (req, res) => {
  const tag = req.query.tag;
  const videos = await Video.find({ tag: { $in: [tag] } });
  res.status(200).json(videos);
});

const search = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const videos = await Video.find({
    title: { $regex: query, $options: "i" },
  }).limit(40);

  res.status(200).json(videos);
});

module.exports = {
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
};

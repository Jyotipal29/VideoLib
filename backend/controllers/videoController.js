const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Video = require("../models/Video");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const VideoLike = require("../models/VideoLike");

async function getTotalLikes(videoId) {
  return await VideoLike.estimatedDocumentCount({
    video: videoId,
  });
}

async function getVideoInfo(videoId) {
  const video = await Video.findById(ObjectId(videoId));

  if (!video) {
    return null;
  }

  return { ...video.toObject(), totalLikes: await getTotalLikes(videoId) };
}

const getVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const video = await getVideoInfo(id);

  if (!video) {
    res.status(404).json({ message: "video not found" });
    return;
  }

  res.status(200).json(video);
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
  try {
    const userid = req.user.id;
    const videoid = req.params.id;
    console.log(videoid);

    const hasLiked = await VideoLike.findOne({
      user: userid,
    });

    if (hasLiked) {
      await hasLiked.delete();
    } else {
      await VideoLike.create({
        user: userid,
        video: videoid,
      });
    }

    // let user = await User.findById(userid).exec();
    // console.log(user);
    // if (user.likes.includes(videoid)) {
    //   user.likes = user.likes.filter(
    //     (video) => video.toString() != videoid.toString()
    //   );
    // } else {
    //   user.likes.push(videoid);
    // }

    res.status(200).json(await getVideoInfo(videoid));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVideo,
  allVideos,
  like,
};

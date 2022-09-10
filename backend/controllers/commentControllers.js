const asyncHandler = require("express-async-handler");
const Video = require("../models/Video");
const Comment = require("../models/Comments");

const addComment = asyncHandler(async (req, res) => {
  const newComment = new Comment({
    ...req.body,
    userId: req.user.id,
  });
  const savedComment = await newComment.save();
  res.status(200).json(savedComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(res.params.id);
  const video = await Video.findById(res.params.id);
  if (req.user.id === comment.userId) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("the comment has been deleted");
  } else {
    res.status(403);
    throw new Error("you can delete only ur comment");
  }
});

const getComment = asyncHandler(async (req, res) => {
  const comments = await Comment.find({
    videoId: req.params.videoId,
  });
  res.status(200).json(comments);
});

module.exports = {
  addComment,
  deleteComment,
  getComment,
};
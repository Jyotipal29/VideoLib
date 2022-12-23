const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const VideoLikeSchema = new mongoose.Schema(
  {
    video: {
      type: ObjectId,
      required: true,
      ref: "Video",
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VideoLike", VideoLikeSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const VideoLikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    videos: [
      {
        type: ObjectId,
        required: true,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VideoLike", VideoLikeSchema);

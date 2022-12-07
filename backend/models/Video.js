const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  ObjectId = Schema.ObjectId;
const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      // required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    likes: {
      type: [ObjectId],
      default: [],
    },
    tag: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", VideoSchema);


// likes: {
//       type: [ObjectId],
      // default: [],
    // }
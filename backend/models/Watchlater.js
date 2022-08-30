const mongoose = require("mongoose");

const WatchLaterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    watchLaterItems: [
      {
        video: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          //   required: true,
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WatchLater", WatchLaterSchema);

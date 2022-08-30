const expressAsyncHandler = require("express-async-handler");
const { watch } = require("../models/User");
const WatchLater = require("../models/Watchlater");

const getWL = expressAsyncHandler(async (req, res) => {
  const watchLater = await WatchLater.find();
  if (watchLater) {
    res.status(201).json({ watchLater });
  } else {
    res.status(401).json({ error: "no watchlater" });
  }
});

const addToWL = expressAsyncHandler(async (req, res) => {
  WatchLater.findOne({ user: req.user._id }).exec((error, watchLater) => {
    if (error) return res.status(400).json({ error });
    if (watchLater) {
      //if cart already exist then update the qty
      const video = req.body.watchLaterItems.video;
      console.log(video, "video");
      const item = watchLater.watchLaterItems.find((c) => c.video == video);
      console.log(item, "item");
      if (item) {
        return res.status(201).json({ msg: "already exist in watchlater" });
      } else {
        WatchLater.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              watchLaterItems: req.body.watchLaterItems,
            },
          }
        ).exec((error, _watchLater) => {
          if (error) return res.status(400).json({ error });
          if (_watchLater) {
            return res.status(201).json({ watchLater: _watchLater });
          }
        });
      }
    } else {
      //if cart not there then createv one cart
      const watchLater = new WatchLater({
        user: req.user._id,
        watchLaterItems: req.body.watchLaterItems,
      });
      watchLater.save((error, watchLater) => {
        if (error) return res.status(400).json({ error });
        if (watchLater) {
          return res.status(201).json({ watchLater });
        }
      });
    }
  });
});

const removeFromWL = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (id) {
    WatchLater.updateOne(
      { user: req.user._id },
      {
        $pull: {
          watchLaterItems: {
            video: id,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ video: id });
      }
    });
  }
});

module.exports = {
  addToWL,
  removeFromWL,
  getWL,
};

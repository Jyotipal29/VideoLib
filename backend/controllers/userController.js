const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Video = require("../models/Video");
const update = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, {
        $set: req.body,
      }, {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(403);
    throw new Error("you can only update ur  account");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } else {
    res.status(403);
    throw new Error("you can only delete ur  account");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("ur not there");
  }
});

//visit this agin understand it properly// git in now
const subscribe = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: {
      subscribedUsers: req.params.id
    },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: {
      subscribers: 1
    },
  });
  res.status(200).json("subscription succesful");
});

const unSubscrie = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      subscribedUsers: req.params.id
    },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: {
      subscribers: -1
    },
  });
  res.status(200).json("unsubscription succesful");
});

// const like = asyncHandler(async (req, res) => {
//   try {
//     const id = req.params.id;
//     // console.log(req.params.id, "id");
//     const video = await Video.findByIdAndUpdate({
//       _id: id
//     }, {
//       $inc: {
//         likes: 1
//       },
//     });
//     console.log(video, "video");
//     const user = await User.findByIdAndUpdate(req.user._id, {
//       $push: {
//         likedVideos: id
//       },
//     });

//     res.json({
//       video,
//       user
//     });
//   } catch (e) {
//     res.status(500).json({
//       success: false,
//       error: {
//         message: "Mongoose error: " + e.message,
//       },
//     });
//   }
// });

// const disLike = asyncHandler(async (req, res) => {
//   try {
//     const id = req.params.id;

//     const video = await Video.findByIdAndUpdate({
//       _id: id
//     }, {
//       $inc: {
//         likes: -1
//       },
//     });
//     const user = await User.findByIdAndUpdate(req.user._id, {
//       $pull: {
//         likedVideos: id
//       },
//     });

//     res.json({
//       success: true,
//       user,
//       video,
//     });
//   } catch (e) {
//     res.status(500).json({
//       success: false,
//       error: {
//         message: "Mongoose error: " + e.message,
//       },
//     });
//   }
// });

// like
const like = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndUpdate(id, {
      $inc: { likes: 1 },
    });
    const user = await User.findByIdAndUpdate(req.user.id, {
      $push: { likedVideos: id },
    });

    res.json({
      success: true,
      video,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message,
      },
    });
  } 
})


//  dislike

const disLike = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndUpdate(id, {
      $inc: { likes: -1 },
    });
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { likedVideos:id },
    });

    res.json({
      success: true,
      video,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message,
      },
    });
  } 
})





module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unSubscrie,
  like,
  disLike,
};
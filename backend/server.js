const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middelwear/error");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
const videoRoutes = require("./routes/videosRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const watchLaterRoutes = require("./routes/watchLaterRoutes");
connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/wl", watchLaterRoutes);
app.use(errorHandler);

const port = 8080;
app.listen(port, () => console.log(`listening in port number ${port}`));

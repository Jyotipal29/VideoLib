import React, { useEffect, useState } from "react";
import "./liked.css";
import Card from "../../components/videoCrad/Card";
import { api } from "../../lib/axios";
// import Home from "@mui/icons-material/Home";
import Home from "../home/Home";
const LikedVideos = () => {
  const [loading, setLoading] = useState(true);
  const [likedVideos, setLikedVideos] = useState([]);
  console.log(likedVideos, "likedvideo");
  async function fetchLikedVideos() {
    setLoading(true);
    try {
      const { data: videos } = await api.get("/users/liked");
      console.log("loaded successfully!", videos);
      setLikedVideos(videos);
    } catch (e) {
      console.log("loading failed");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLikedVideos();
  }, []);
  return (
    <Home>
      {loading && (
        <div className="loader">
          <p style={{ color: "white" }}>Please wait. Loading videos...</p>
        </div>
      )}
      {likedVideos.length === 0 ? (
        // TODO: Handle styling for proper height
        <div style={{ color: "white" }}>No liked videos</div>
      ) : (
        <div className="video-container">
          {likedVideos.map((videos) => (
            <Card key={videos._id} video={videos} />
          ))}
        </div>
      )}
    </Home>
  );
};

export default LikedVideos;

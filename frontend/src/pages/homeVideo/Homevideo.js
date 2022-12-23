import React from "react";
import Home from "../home/Home";
import { useVideo } from "../../context/videoContext/videoContext";
import Card from "../../components/videoCrad/Card";
import Filter from "../../components/filter/Filter";
const Homevideo = () => {
  const {
    videoState: { videos, searchQuery },
    videoDispatch,
  } = useVideo();
  const filVideos = () => {
    let newVideos = videos;
    if (searchQuery) {
      newVideos = newVideos.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery)
      );
    }
    return newVideos;
  };

  return (
    <Home>
      <Filter />

      <div className="video-container">
        {filVideos().map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </Home>
  );
};

export default Homevideo;

import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../constants/api";
import axios from "axios";
import cat from "../../data";
import { useVideo } from "../../context/videoContext/videoContext";
const Filter = () => {
  const {
    videoState: { videos },
    videoDispatch,
  } = useVideo();
  const [currentTag, setCurrentTag] = useState(null);
  console.log(videos, "videos");
  const fetchVideos = async (filter = {}) => {
    let { value = null } = filter;

    value = value === "all" ? null : value;
    const { data } = await axios.get(`${api}videos?tag=${value}`);
    console.log(data, value);
    return data;
  };
  useEffect(() => {
    (async function () {
      videoDispatch({
        type: "GET_VIDEOS",
        payload: await fetchVideos({ value: currentTag }),
      });
    })();
  }, [currentTag, videoDispatch]);

  return (
    <div>
      <div className="home-cat-wrapper">
        {cat &&
          cat.map((item) => {
            return (
              <button
                className="home-cat-chip"
                key={item.value}
                onClick={() => setCurrentTag(item.value)}
              >
                {item.value}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Filter;

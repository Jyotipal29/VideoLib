import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../constants/api";
import { useUser } from "../../context/userContext/userContext";
import { useVideo } from "../../context/videoContext/videoContext";
import Home from "../home/Home";
import "./watchlater.css";

const WatchLater = () => {
  const {
    state: { user },
  } = useUser();
  const {
    videoState: { watchLater },
    videoDispatch,
  } = useVideo();
  console.log(watchLater, "watchlater");
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${api}wl/`, config);
      const dataM = data.watchLater[0].watchLaterItems;

      //   console.log(dataM, "data");
      videoDispatch({ type: "GET_WATCHLATER", payload: dataM });
    };
    fetchData();
  }, []);

  const wlDeleteHandler = async (id) => {
    console.log(id, "data");

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`${api}wl/${id}`, config);
    console.log(data, "data");
    videoDispatch({ type: "DELETE_WATCHLATER", payload: data });
  };
  console.log(watchLater, "watchlater");
  //   const item = watchLater.map((i) => i.watchLaterItems);
  //   console.log(item, "item");

  return (
    <Home>
      <div className="video-container">
        {watchLater &&
          watchLater.map((item) => (
            <Link
              to={`/videos/${item.video}`}
              style={{ textDecoration: "none" }}
            >
              <div className="video-card">
                <img src={item.thumbnailUrl} alt="" />
                <div className="video-details">
                  <h3>{item.title}</h3>
                  <p>{item.creator}</p>
                </div>
                <button
                  className="wl-btn"
                  onClick={() => wlDeleteHandler(item._id)}
                >
                  x
                </button>
              </div>
            </Link>
          ))}
      </div>
    </Home>
  );
};

export default WatchLater;

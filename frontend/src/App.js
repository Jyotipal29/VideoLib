import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Video from "./pages/video/Video";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import WatchLater from "./pages/watchLater/WatchLater";
import LikedVideos from "./pages/likedVideo/LikedVideos";
import Playlist from "./pages/playlist/playlist";
import Homevideo from "./pages/homeVideo/Homevideo";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" index element={<Homevideo />} />
          <Route path="/videos/:id" index element={<Video />} />

          <Route path="/watchlater" index element={<WatchLater />} />
          <Route path="/liked" index element={<LikedVideos />} />
          <Route path="/playlist" index element={<Playlist />} />
        </Route>
        <Route path="/register" index element={<Register />} />
        <Route path="/login" index element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

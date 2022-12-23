import { ThemeProvider } from "@mui/system";
import styled from "styled-components";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Menu from "./components/sidebar/Menu";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import Filtered from "./pages/filter/Filtered";
import WatchLater from "./pages/watchLater/WatchLater";
import LikedVideos from "./pages/likedVideo/LikedVideos";
import Playlist from "./pages/playlist/playlist";
import Filter from "./components/filter/Filter";
import Homevideo from "./pages/homeVideo/Homevideo";
const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;
function App() {
  // const [darkMode, setDarkMode] = useState(true);
  return (
    // <ThemeProvider>
    <Container>
      <BrowserRouter>
        {/* <Menu /> */}
        <Main>
          <Navbar />
          {/* <Filters /> */}
          <Wrapper>
            <Routes>
              <Route path="/" index element={<Homevideo />} />
              <Route path="/videos/:id" index element={<Video />} />

              <Route path="/watchlater" index element={<WatchLater />} />
              <Route path="/liked" index element={<LikedVideos />} />
              <Route path="/playlist" index element={<Playlist />} />
              <Route path="/register" index element={<Register />} />
              <Route path="/login" index element={<SignIn />} />

              {/* <Route path="/filtered" index element={<Filtered />} />
              
              <Route path="/trend" element={<Home />} />
              <Route path="/subscriptions" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/videos/:id" element={<Video />} /> */}
            </Routes>
          </Wrapper>
        </Main>
      </BrowserRouter>
    </Container>
    // </ThemeProvider>
  );
}

export default App;

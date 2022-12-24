import Card from "../../components/videoCrad/Card";
import { useVideo } from "../../context/videoContext/videoContext";

const Filtered = () => {
  const {
    videoState: { filteredVideos },
  } = useVideo();
  console.log(filteredVideos);
  return (
    <div>
      {filteredVideos &&
        filteredVideos.map((video) => <Card key={video._id} video={video} />)}
    </div>
  );
};

export default Filtered;

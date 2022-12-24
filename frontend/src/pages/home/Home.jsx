import "./home.css";
import Menu from "../../components/sidebar/Menu";
const Home = ({ children }) => {
  return (
    <div className="home-container">
      <div className="sidebar">
        <Menu />
      </div>
      <div className="home-content">
        {/* videos */}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Home;

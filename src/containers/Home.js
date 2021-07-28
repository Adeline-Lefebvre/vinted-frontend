import { Link } from "react-router-dom";
import Header from "../components/Header.js";
import image1 from "../image1.jpeg";
import image2 from "../image2.svg";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="images">
        <img className="image1" src={image1} alt="" />
        <img className="image2" src={image2} alt="" />
      </div>

      <a target="_blank" href="http://localhost:3000/offer">
        Go to offer
      </a>
    </div>
  );
};

export default Home;

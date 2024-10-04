import { Link } from "react-router-dom";
import imgHome from "../assets/home.png";
import imgLibrary from "../assets/library.png";
import imgMyReviews from "../assets/my-reviews.png";
import { useEffect, useState } from "react";
import axios from "axios";
import appLogo from "../assets/1upLogo.png";
import menuImg from "../assets/menu.png";
import github from "../assets/github.png";

function NavBar() {
  const [profile, setProfile] = useState(appLogo);
  const [userId, setUserId] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/profiles`
      );
      setProfile(response.data[0].profilePic);
      setUserId(response.data[0].id);
    } catch (error) {
      console.log("fetch profile", error);
    }
  };

  const handleBurger = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className={`button3D burger ${isNavOpen ? "openbtn" : "closebtn"}`}
        onClick={handleBurger}
      >
        <img src={menuImg} alt="" style={{ height: "100%" }} />
      </button>
      <nav className={`navBar ${isNavOpen && "open"} `}>
        <ul>
          <Link className="navButton" to={"/"}>
            <img src={imgHome} alt="NavImg" />
            <span className="navLegend">Explore</span>
          </Link>
          <Link className="navButton" to={"/vault"}>
            <img
              src={imgLibrary}
              style={{ height: "45px", width: "45px", margin: "2.5px" }}
              alt="NavImg"
            />
            <span className="navLegend">My Vault</span>
          </Link>
          <Link className="navButton" to={`/myReviews/${userId}`}>
            <img
              src={imgMyReviews}
              style={{ height: "45px", width: "45px", margin: "2.5px" }}
              alt="NavImg"
            />
            <span className="navLegend">My Reviews</span>
          </Link>
          <Link
            to="https://github.com/diegoldc/1up-webapp"
            className="navButton gitHubBtn"
          >
            <img src={github} alt="" />
            <span className="navLegend">Web app repo</span>
          </Link>
          <Link
            to="https://github.com/diegoldc/json-server"
            className="navButton gitHubBtn"
          >
            <img src={github} alt="" />
            <span className="navLegend">Server repo</span>
          </Link>
          <Link className="navButton " to={"/profiles"}>
            <img className="navBarProfile" src={profile} alt="NavImg" />
            <span className="navLegend">Bob_007</span>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;

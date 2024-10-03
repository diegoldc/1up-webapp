import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/1upLogo.png";
import { useState, useEffect } from "react";

function ReviewCard({
  content,
  profilePic,
  userName,
  rating,
  usrName,
  id,
  gameId,
  onDelete,
  gameName,
  oneUser,
  wouldRecommend,
}) {
  const [isGameComplete, setIsGameCompleted] = useState(false);
  const [isGameOwned, setIsGameOwned] = useState(false);
  const [isGameRecommended, setIsGameRecommended] = useState(wouldRecommend);
  let stars;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/myGames/?gameId=${gameId}`
      );
      if (response.data.length > 0 && userName === "Bob_007") {
        setIsGameOwned(true);
        setIsGameCompleted(response.data[0].isGameCompleted);

      }
    } catch (error) {
      console.log("get game/user info", error);
    }
  };

  if (Math.round(rating) === 0) {
    stars = "☆ ☆ ☆ ☆ ☆";
  } else if (Math.round(rating) === 1) {
    stars = "★ ☆ ☆ ☆ ☆";
  } else if (Math.round(rating) === 2) {
    stars = "★ ★ ☆ ☆ ☆";
  } else if (Math.round(rating) === 3) {
    stars = "★ ★ ★ ☆ ☆";
  } else if (Math.round(rating) === 4) {
    stars = "★ ★ ★ ★ ☆";
  } else if (Math.round(rating) === 5) {
    stars = "★ ★ ★ ★ ★";
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/reviews/${id}`);
      onDelete(id);
    } catch (error) {
      console.log("FATAL ERROR", error);
    }
  };

  return (
    <div className="revCard">
      {oneUser && <h2>{gameName}</h2>}
      <img
        style={{
          height: "40px",
          width: "40px",
          overflow: "hidden",
          borderRadius: "40px",
        }}
        src={profilePic === null || profilePic === "" ? logo : profilePic}
        alt="profilePic"
      />
      <h3>{userName}</h3>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <p
          className="ownIndicator"
          style={{
            border: isGameComplete ? "1px solid green" : "1px solid red",
            backgroundColor: isGameComplete ? "lightgreen" : "pink",
            color: isGameComplete ? "green" : "red",
          }}
        >
          <span hidden={isGameComplete}>Not</span>Complete
        </p>
        <p
          className="ownIndicator"
          style={{ 
            border: isGameOwned ? "1px solid green" : "1px solid red",
            backgroundColor: isGameOwned ? "lightgreen" : "pink",
            color: isGameOwned ? "green" : "red",
          }}
        >
          <span hidden={isGameOwned}>Not</span>Owned
        </p>
        <p
          className="ownIndicator"
          style={{ 
            border: isGameRecommended ? "1px solid green" : "1px solid red",
            backgroundColor: isGameRecommended ? "lightgreen" : "pink",
            color: isGameRecommended ? "green" : "red",
          }}
        >
          <span hidden={isGameRecommended}>Not </span>Recommended
        </p>
      </div>
      <p style={{ margin: "10px" }}>Rating: {stars}</p>
      <p style={{ backgroundColor: "#21333f", margin: "10px 15px" }}>
        {content}
      </p>
      {usrName === userName && (
        <>
          <Link to={`/games/${gameId}/editReview/${id}`}>
            <button className="button3D">Edit</button>
          </Link>
          <button className="button3D" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ReviewCard;

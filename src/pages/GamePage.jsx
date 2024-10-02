import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import Spinner from "../components/Spinner";

function GamePage() {
  const params = useParams();

  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [usrName, setUsrName] = useState(null);
  const [ isHidden , setIsHidden ] = useState(true)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/games/${params.gameId}${
          import.meta.env.VITE_RAWG_KEY
        }`
      );
      setGameDetails(response.data);
    } catch (error) {
      console.log("FATAL ERROR (game)", error);
    }
    try {
      const revResponse = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/reviews?gameId=${params.gameId}`
      );
      setReviews(revResponse.data);
    } catch (error) {
      console.log("FATAL ERROR (reviews)", error);
    }
    try {
      const userData = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/profile`
      );
      setUsrName(userData.data[0].user);
    } catch (error) {
      console.log("FATAL ERROR (profile)", error);
    }
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };


  if (gameDetails === null) {
    return <Spinner />
  }

  return (
    <div>
      <h3>{gameDetails.name}</h3>
      <img
        src={gameDetails.background_image}
        alt="image"
        style={{ width: "200px", borderRadius: "15px" }}
      />
      <p className="gameDesc">
        {gameDetails.description_raw.substring(0, 200)}<span hidden={!isHidden}>...</span>
        <span hidden={isHidden}>
          {gameDetails.description_raw.substring(
            200,
            gameDetails.description_raw.length
          )}
        </span>
        <button className="showMore" onClick={() => setIsHidden(!isHidden)}>{isHidden ? "...show more" : "...show less"}</button>
      </p>
      <Link state={gameDetails.id} to={`/games/${gameDetails.id}/addToVault`} >
      <button className="button3D">Add to vault</button>
      </Link>
      <Link state={gameDetails.name} to={`/games/${gameDetails.id}/addReview`}>
        <button className="button3D">Add review</button>
      </Link>
      {reviews === null ? (
        <Spinner />
      ) : (
        reviews.map((rev) => (
          <ReviewCard
            usrName={usrName}
            key={rev.id}
            {...rev}
            onDelete={handleDeleteReview}
          />
        ))
      )}
    </div>
  );
}

export default GamePage;

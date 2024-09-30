import { Link , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";

function GamePage() {
  const params = useParams();

  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [ usrName , setUsrName ] = useState(null)

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
      const revResponse = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/reviews?gameId=${params.gameId}`
      );
      setReviews(revResponse.data);
      const userData = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/profile`
      );
      setUsrName(userData.data[0].user)
    } catch (error) {
      console.log("FATAL ERROR", error);
    }
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId))
  }

  if (gameDetails === null) {
    return <h1>...Loading</h1>;
  }

  return (
    <div>
      <h3>{gameDetails.name}</h3>

      <img
        src={gameDetails.background_image}
        alt="image"
        style={{ width: "200px", borderRadius: "15px" }}
      />

      <p>{gameDetails.description_raw}</p>
      <Link state={gameDetails.name} to={`/games/${params.gameId}/addReview`} >
      <button>Add review</button>
      </Link>
      {reviews === null ? (
        <h1>...Loading reviews</h1>
      ) : (
        reviews.map((rev) => <ReviewCard usrName={usrName} key={rev.id} {...rev} onDelete={handleDeleteReview} />)
      )}
    </div>
  );
}

export default GamePage;

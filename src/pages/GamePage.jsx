import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import Spinner from "../components/Spinner";
import CarouselScreen from "../components/CarouselScreen";
import GameCarousel from "../components/GameCarousel";
import imgTags from "../assets/tags.png";

function GamePage() {
  const params = useParams();

  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [usrName, setUsrName] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [suggestionArray, setSuggestionArray] = useState([]);
  let picArray = [];

  useEffect(() => {
    getData();
  }, [params]);

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
        `${import.meta.env.VITE_LOCAL_URL}/profiles`
      );
      setUsrName(userData.data[0].user);
    } catch (error) {
      console.log("FATAL ERROR (profile)", error);
    }
    try {
      const screenshotsData = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/games/${params.gameId}/screenshots${
          import.meta.env.VITE_RAWG_KEY
        }`
      );
      setDataArray(screenshotsData.data.results);
    } catch (error) {
      console.log("screenshots", error);
    }
    try {
      const suggestionsData = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/games/${params.gameId}/game-series${
          import.meta.env.VITE_RAWG_KEY
        }`
      );
      setSuggestionArray(suggestionsData.data.results);
    } catch (error) {
      console.log("suggested", error);
    }
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  if (gameDetails === null) {
    return <Spinner />;
  }
  if (dataArray.length > 1) {
    dataArray.map((imgObj) => {
      picArray.unshift(imgObj.image);
    });
  }

  return (
    <div>
      <h1>{gameDetails.name}</h1>
      <CarouselScreen
        cover={gameDetails.background_image}
        screenshots={picArray}
      />
      <div className="tagContainer">
        <img className="cornerTags" src={imgTags} />
        {gameDetails.tags.length > 0 &&
          gameDetails.tags.map((tag, index) => {
            if (index < 10) {
              return (
                <span className="tag" key={index}>
                  {tag.name.substring(0, 8)}
                </span>
              );
            }
          })}
      </div>
      <p className="gameDesc">
        {gameDetails.description_raw.substring(0, 200)}
        <span hidden={!isHidden}>...</span>
        <span hidden={isHidden}>
          {gameDetails.description_raw.substring(
            200,
            gameDetails.description_raw.length
          )}
        </span>
        <button className="showMore" onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? "...show more" : "...show less"}
        </button>
      </p>
      <Link state={gameDetails.id} to={`/games/${gameDetails.id}/addToVault`}>
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
            oneUser={false}
            usrName={usrName}
            key={rev.id}
            {...rev}
            onDelete={handleDeleteReview}
          />
        ))
      )}
      {suggestionArray.length > 0 && (
        <>
          <h4 className="titleGameSeries">Other titles from this series:</h4>
          <GameCarousel suggestionArray={suggestionArray} />
        </>
      )}
    </div>
  );
}

export default GamePage;

import { useEffect, useState } from "react";
import axios from "axios";
import StoreGameCard from "../components/StoreGameCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Spinner from "../components/Spinner";

function StorePage() {
  const [gameList, setGameList] = useState(null);
  const [pageInfo, setPageInfo] = useState({ next: null, previous: null });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const getData = async (page) => {
    setGameList(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/games${
          import.meta.env.VITE_RAWG_KEY
        }&page=${page}`
      );
      setPageInfo({
        next: `${response.data.next}`,
        previous: `${response.data.previous}`,
      });
      setGameList(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (gameList === null) {
    return <Spinner />;
  }

  return (
    <>
      <FilterBar />
      <SearchBar setGameList={setGameList} />

      <div className="gameList">
        {gameList.map((game) => {
          return <StoreGameCard key={game.id} {...game} />;
        })}
      </div>

      <div className="pagesBtns">
        <button
          className="button3D"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={pageInfo.previous == "null" ? true : false}
        >
          Previous
        </button>
        <button
          className="button3D"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={pageInfo.next == "null" ? true : false}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default StorePage;

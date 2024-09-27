import { useEffect, useState } from "react";
import axios from "axios";
import StoreGameCard from "../components/StoreGameCard";

function StorePage() {
  const [gameList, setGameList] = useState(null);
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const getData = async (page) => {
    setGameList(null);

    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=66de422f402448d9bb9f0fa806195ea1&page=${page}`
      );
      setPageInfo(response.data);
      setGameList(response.data.results);
      console.log(gameList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    if (pageInfo.next) {
      setCurrentPage(currentPage + 1)
    }
  };

  const handlePrevPage = () => {
    if (pageInfo.prev) {
      setCurrentPage(currentPage - 1)
    }
  };

  if (gameList === null) {
    return <h1>...Loading</h1>;
  }

  return (
    <>
      <div>
        {gameList.map((game) => {
          return <StoreGameCard key={game.id} {...game} />;
        })}
      </div>

      <div>
        
        <button onClick={handlePrevPage} disabled={!pageInfo.prev}>
          Anterior
        </button>
        <button onClick={handleNextPage} disabled={!pageInfo.next}>
          Siguiente
        </button>
      </div>
    </>
  );
}

export default StorePage;
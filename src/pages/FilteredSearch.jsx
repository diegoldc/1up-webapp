import { useParams } from "react-router-dom"
import { useEffect , useState } from "react"
import axios from "axios"
import StoreGameCard from "../components/StoreGameCard"
import Spinner from '../components/Spinner';


function FilteredSearch() {

  const {filterName , filterId} = useParams()
  const [gameList, setGameList] = useState(null);
  const [pageInfo, setPageInfo] = useState({ next: null, previous: null });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData(currentPage)
  }, [currentPage])

  const getData = async (page) => {
    try {
      const filterData = await axios.get(`${import.meta.env.VITE_RAWG_URL}/games?${filterName}=${filterId}${import.meta.env.VITE_RAWG_KEY_AMP}&page=${page}`)
      setGameList(filterData.data.results)
      setPageInfo({ next:`${filterData.data.next}`, previous:`${filterData.data.previous}`})
      console.log(filterData.data.results)
      console.log(pageInfo)

    } catch (error) {
      console.log(filterName,error)
    }
  }

  if (gameList === null) {
    return <Spinner />;
  }


  return (
    <>
    <div className="gameList">
    {gameList.map((game) => {
      return <StoreGameCard key={game.id} {...game} />;
    })}
    </div>

    <div className="pagesBtns">
    
    <button className="button3D" onClick={() => setCurrentPage(currentPage - 1)} disabled={pageInfo.previous == "null" ? true : false}>
      Previous
    </button>
    <button className="button3D" onClick={() => setCurrentPage(currentPage + 1)} disabled={pageInfo.next == "null" ? true : false}>
      Next
    </button>
    </div>
    </>
  )
}

export default FilteredSearch
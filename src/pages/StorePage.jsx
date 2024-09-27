import { useEffect , useState } from "react"
import axios from "axios"
import StoreGameCard from "../components/StoreGameCard"

function StorePage() {

  const [ gameList , setGameList ] = useState(null)
  const [ pageNumber , setPageNumber ] = useState(1)
  console.log(pageNumber)

  useEffect(() => {
    getData()
  },[pageNumber])
  
  const getData = async () => {
    try {
      const response = await axios.get("https://api.rawg.io/api/games?key=66de422f402448d9bb9f0fa806195ea1&page=6")
      
      setGameList(response.data.results)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  if (gameList === null){
    return <h1>...Loading</h1>
  }

  return (
    <div>
      {gameList.map((game) => {
        return <StoreGameCard key={game.id} {...game} />
      })}
    </div>
  )
}

export default StorePage
import { useState , useEffect } from "react"
import { Link , useParams } from "react-router-dom"
import axios from "axios"


function MyGamePage() {

  const {myGameId} = useParams()
  const [ myGameData , setMyGameData ] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/myGames/${myGameId}`)
      console.log(response.data)
      setMyGameData(response.data)
    } catch (error) {
      console.log("my game data",error)
    }
  }


  if(myGameData === null){
    return(<h1>...loading</h1>)
  }

  return (
    <>
    <h1>{myGameData.name}</h1>
    <img style={{height:"200px"}} src={myGameData.cover} alt="" />
    <h3>Hours Played: {myGameData.hoursPlayed}</h3>
    {myGameData.isGameCompleted ? (
      <p style={{color:"green"}} >GAME COMPLETE</p>
    ) : (
      <p style={{color:"red"}} >GAME NOT COMPLETE</p>
    )}
    <p>Platform: {myGameData.platform}</p>
    <Link to={`/games/${myGameData.gameId}`}>
    <button className="button3D" >See in Store</button>
    </Link>
    </>
  )
}

export default MyGamePage
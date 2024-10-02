import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import Spinner from "../components/Spinner"

function Library() {

  const [myGames, setMyGames] = useState(null)

  useEffect(() => {
    getMyGames()
  }, [])

  const getMyGames = async () => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/myGames`)
      setMyGames(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  if (myGames === null) {
    return <Spinner />
  }

  return (
    <div className="gameLibrary">

      {myGames.map((eachGame) => {
        return (
          <Link key={eachGame.id} to={`/vault/${eachGame.id}`} style={{textDecoration:"none"}} >
            <Card border="dark" className="gameCard" style={{ width: '10rem',height:'15rem' }}>
              <Card.Img style={{height:"160px",objectFit: "cover"}} variant="top" src={eachGame.cover} alt="" />
              <Card.Body className="cardContent" >
                <Card.Title>{eachGame.name}</Card.Title>
                <Card.Subtitle>Hours: {eachGame.hoursPlayed}</Card.Subtitle>
                <Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        )
      })}

    </div>
  )
}

export default Library
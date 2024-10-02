import { Carousel , Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function GameCarousel({suggestionArray}) {
  return (
    <Carousel style={{height:"30vh",maxHeight:"200px",width:"60vw",margin:"auto"}}>
        {suggestionArray.map((eachGame, index) => {
          if(eachGame.name.length>23){
            eachGame.name = eachGame.name.slice(0,20) + "..."
          }
          return(
            <Carousel.Item style={{height:"30vh",maxHeight:"200px"}} key={index} interval={3000}>
                <Link to={`/games/${eachGame.id}`} style={{textDecoration:"none"}}>
              <Card style={{height:"200px",border:"none",backgroundColor:"#151e24"}}>
                <Card.Img style={{minHeight:"125px",width:"100%",objectFit: "cover"}} variant="top" src={eachGame.background_image} alt=""/>
                <Card.Body className="cardContent" style={{color:"lightblue"}} >
                <Card.Title>{eachGame.name}</Card.Title>
                <Card.Subtitle>Rating: {eachGame.rating}</Card.Subtitle>
              </Card.Body>
              </Card>
                </Link>
            </Carousel.Item>
          )
        })}
    </Carousel>
  )
}

export default GameCarousel
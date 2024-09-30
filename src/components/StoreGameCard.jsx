import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function StoreGameCard({id,name,rating,background_image,tags}) {
  // let randNum
  // if (tags.length > 2) {
  //   randNum = Math.floor(Math.random() * tags)-3
  // } 


  return (
    <Link to={`/games/${id}`} style={{textDecoration:"none"}} >
    <Card border="dark" className="gameCard" style={{ width: '18rem',height:'18rem' }}>
      <Card.Img style={{height:"160px",objectFit: "cover"}} variant="top" src={background_image} alt="" />
      <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle  >rating: {rating}</Card.Subtitle>
      <Card.Text>

      {/* {tags.length > 2 ? (
        <>
        <p>{tags[Math.floor(randNum)].name}</p>
        <p>{tags[Math.floor(randNum +1)].name}</p>
        <p>{tags[Math.floor(randNum +2)].name}</p>
        </>
        ) : ( null) } */}
      {/* <p>{tags[0].name} </p> */}
      {/* // <p>{tags[1].name} </p> */}
      {/* <p>{tags[2].name} </p> */}
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
  )
}

export default StoreGameCard
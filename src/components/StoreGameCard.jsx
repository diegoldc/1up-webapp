import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function StoreGameCard({ id, name, rating, background_image }) {
  if (name.length > 25) {
    name = name.slice(0, 23) + "...";
  }

  return (
    <Link to={`/games/${id}`} style={{ textDecoration: "none" }}>
      <Card
        border="dark"
        className="gameCard"
        style={{ width: "18rem", height: "15rem" }}
      >
        <Card.Img
          style={{ height: "160px", objectFit: "cover" }}
          variant="top"
          src={background_image}
          alt=""
        />
        <Card.Body className="cardContent">
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>rating: {rating}</Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default StoreGameCard;

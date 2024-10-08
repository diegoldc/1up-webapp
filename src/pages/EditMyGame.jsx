import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";

function EditMyGame() {
  const { myGameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const gameData = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/myGames/${myGameId}`
      );
      setGameInfo(gameData.data);
    } catch (error) {
      console.log("get game info", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(
      `${import.meta.env.VITE_LOCAL_URL}/myGames/${myGameId}`,
      gameInfo
    );
    navigate(`/vault/${myGameId}`);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isGameCompleted") {
      setGameInfo({
        ...gameInfo,
        [name]: checked,
      });
    } else {
      setGameInfo({
        ...gameInfo,
        [name]: value,
      });
    }
  };

  if (gameInfo === null) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Edit your game</h1>
      <img
        style={{ width: "70vw", maxWidth: "380px", borderRadius: "15px" }}
        src={gameInfo.cover}
        alt=""
      />
      <h3>{gameInfo.name}</h3>
      <Form.Group className="mb-3">
        <Form.Label>Cover:</Form.Label>
        <Form.Control
          className="bg-dark text-light"
          name="cover"
          value={gameInfo.cover}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          name="isGameCompleted"
          label="I completed this game"
          checked={gameInfo.isGameCompleted}
          onChange={() => handleChange(event)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hours played:</Form.Label>
        <Form.Control
          className="bg-dark text-light"
          name="hoursPlayed"
          type="number"
          value={gameInfo.hoursPlayed}
          onChange={handleChange}
        />
      </Form.Group>
      <button className="button3D" type="submit">
        Save changes
      </button>
    </Form>
  );
}

export default EditMyGame;

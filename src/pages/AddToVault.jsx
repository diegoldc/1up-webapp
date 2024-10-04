import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";

function AddToVault() {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [screenshot, setScreenshot] = useState("https://");
  const [newVaultObj, setNewVaultObj] = useState({
    name: "",
    cover: "",
    gameId,
    platform: "",
    isGameCompleted: false,
    screenshots: [],
    hoursPlayed: 0,
  });
  const [possiblePlatforms, setPossiblePlatforms] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const gameData = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/games/${gameId}${
          import.meta.env.VITE_RAWG_KEY
        }`
      );
      setNewVaultObj({
        ...newVaultObj,
        name: `${gameData.data.name}`,
        cover: `${gameData.data.background_image}`,
      });
      setPossiblePlatforms(gameData.data.platforms);
    } catch (error) {
      console.log("get game data", error);
    }
  };

  const handleChecked = () => {
    if (newVaultObj.isGameCompleted === false) {
      setNewVaultObj({ ...newVaultObj, isGameCompleted: true });
    } else {
      setNewVaultObj({ ...newVaultObj, isGameCompleted: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (screenshot !== "https://") {
      setNewVaultObj({ ...newVaultObj, screenshots: [screenshot] });
    }
    try {
      const myVaultData = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/myGames/?gameId=${gameId}`
      );
      if (myVaultData.data.length === 1) {
        navigate(`/vault/fallback`);
      } else {
        axios.post(`${import.meta.env.VITE_LOCAL_URL}/myGames`, newVaultObj);
        navigate(`/vault`);
      }
    } catch (error) {
      console.log("get from vault", error);
    }
  };

  if (possiblePlatforms === null) {
    return <Spinner />;
  }

  return (
    <>
      <h3>Add this game to your Vault</h3>
      <h1>{newVaultObj.name}</h1>
      {/* <img src={newVaultObj.cover} alt="" /> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>On what platform do you own this game?</Form.Label>
          <Form.Select
            className="bg-dark text-light"
            name="platform"
            value={newVaultObj.platform}
            onChange={() =>
              setNewVaultObj({
                ...newVaultObj,
                platform: `${event.target.value}`,
              })
            }
            required
          >
            <option value="">Select Platform</option>
            {possiblePlatforms.map((eachPlatform, index) => {
              return (
                <option key={index} value={`${eachPlatform.platform.name}`}>
                  {eachPlatform.platform.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="game completed"
            label="I completed this game"
            checked={newVaultObj.isGameCompleted}
            onChange={handleChecked}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Would you like to add a screenshot?</Form.Label>
          <Form.Control
            className="bg-dark text-light"
            name="screenshot"
            value={screenshot}
            onChange={() => setScreenshot(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>How many hours did you play for?</Form.Label>
          <Form.Control
            className="bg-dark text-light"
            name="hoursPlayed"
            type="number"
            value={newVaultObj.hoursPlayed}
            onChange={() =>
              setNewVaultObj({
                ...newVaultObj,
                hoursPlayed: event.target.value,
              })
            }
          />
        </Form.Group>
        <button className="button3D" type="submit">
          Add to Vault
        </button>
      </Form>
    </>
  );
}

export default AddToVault;

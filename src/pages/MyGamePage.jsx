import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Form from "react-bootstrap/Form";
import CarouselScreen from "../components/CarouselScreen";
import Spinner from "../components/Spinner";

function MyGamePage() {
  const navigate = useNavigate();
  const { myGameId } = useParams();
  const [myGameData, setMyGameData] = useState(null);
  const [newScreenshot, setNewScreenshot] = useState("https://");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/myGames/${myGameId}`
      );
      setMyGameData(response.data);
    } catch (error) {
      console.log("my game data", error);
    }
  };

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_LOCAL_URL}/myGames/${myGameId}`);
    navigate("/vault");
  };

  const handleAddScreenshot = (e, close) => {
    e.preventDefault();
    let allScreenshots = myGameData.screenshots;
    allScreenshots = [...allScreenshots, newScreenshot];
    axios.patch(`${import.meta.env.VITE_LOCAL_URL}/myGames/${myGameId}`, {
      screenshots: allScreenshots,
    });
    close();
    getData();
  };

  if (myGameData === null) {
    return <Spinner />;
  }

  return (
    <>
      <h1>{myGameData.name}</h1>

      <CarouselScreen
        cover={myGameData.cover}
        screenshots={myGameData.screenshots}
      />

      <h3 style={{ marginTop: "20px" }}>
        Hours Played: {myGameData.hoursPlayed}
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {myGameData.isGameCompleted ? (
          <p
            style={{
              width: "200px",
              color: "green",
              backgroundColor: "lightgreen",
              border: "1px solid green",
              borderRadius: "5px",
            }}
          >
            GAME COMPLETE
          </p>
        ) : (
          <p
            style={{
              width: "200px",
              color: "red",
              backgroundColor: "pink",
              border: "1px solid red",
              borderRadius: "5px",
            }}
          >
            GAME NOT COMPLETE
          </p>
        )}
      </div>
      <p>Platform: {myGameData.platform}</p>
      <div style={{ width: "90vw", maxWidth: "900px", margin: "auto" }}>
        <Link to={`/games/${myGameData.gameId}`}>
          <button className="button3D">See in Store</button>
        </Link>
        <Link to={`/vault/${myGameId}/edit`}>
          <button className="button3D">Edit my Game</button>
        </Link>
        <Popup trigger={<button className="button3D">Add screenshot</button>}>
          {(close) => (
            <Form onSubmit={() => handleAddScreenshot(event, close)}>
              <Form.Group className="mb-3">
                <Form.Label>Screenshot URL:</Form.Label>
                <Form.Control
                  className="bg-dark text-light"
                  name="screenshot"
                  value={newScreenshot}
                  onChange={() => setNewScreenshot(event.target.value)}
                />
              </Form.Group>
              <button className="button3D popup-button" type="submit">
                Send
              </button>
            </Form>
          )}
        </Popup>
        <Popup
          trigger={<button className="button3D">Remove from vault</button>}
        >
          {(close) => (
            <>
              <p>Are you sure you want to delete this game from your vault?</p>
              <button className="button3D popup-button" onClick={close}>
                No
              </button>
              <button className="button3D popup-button" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </Popup>
        <Link to="/play">
          <button className="button3D playbtn">Play</button>
        </Link>
      </div>
    </>
  );
}

export default MyGamePage;

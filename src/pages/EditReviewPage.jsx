import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";

function EditReviewPage() {
  const { gameId, reviewId } = useParams();
  const navigate = useNavigate();

  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [usrName, setUsrName] = useState(null);
  const [usrPic, setUsrPic] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userData = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/profiles`
      );
      setUsrName(userData.data[0].user);
      setUsrPic(userData.data[0].profilePic);
    } catch (error) {
      console.log(error);
    }
    try {
      const revData = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/reviews/${reviewId}`
      );
      setEditContent(revData.data.content);
      setEditRating(revData.data.rating);
      setGameName(revData.data.gameName);
      setWouldRecommend(revData.data.wouldRecommend);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChecked = () => {
    if (wouldRecommend === false) {
      setWouldRecommend(true);
    } else {
      setWouldRecommend(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let editObj = {
      content: editContent,
      rating: editRating,
      wouldRecommend,
    };
    axios.patch(
      `${import.meta.env.VITE_LOCAL_URL}/reviews/${reviewId}`,
      editObj
    );
    navigate(`/games/${gameId}`);
  };

  if (editContent === null || editRating === null) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Edit Review</h1>
      <h3>{gameName}</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "30px",
        }}
      >
        <img
          style={{
            height: "60px",
            width: "60px",
            overflow: "hidden",
            borderRadius: "40px",
          }}
          src={usrPic}
          alt=""
        />
        <p style={{ margin: "0px 0px 0px 10px", fontSize: "1.7rem" }}>
          {usrName}{" "}
        </p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rating:</Form.Label>
          <Form.Select
            className="bg-dark text-light"
            type="number"
            name="rating"
            value={editRating}
            onChange={() => setEditRating(event.target.value)}
            required
          >
            <option value="">Select Rating</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Review:</Form.Label>
          <Form.Control
            className="bg-dark text-light revContainer"
            name="content"
            as="textarea"
            value={editContent}
            onChange={() => setEditContent(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="wouldRecommend"
            label="I would recommend this game"
            checked={wouldRecommend}
            onChange={handleChecked}
          />
        </Form.Group>
        <button className="button3D" type="submit">
          Edit Review
        </button>
      </Form>
    </div>
  );
}

export default EditReviewPage;

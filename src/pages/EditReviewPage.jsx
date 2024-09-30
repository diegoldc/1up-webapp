import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditReviewPage() {
  const { gameId, reviewId } = useParams();
  const navigate = useNavigate();

  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState("");
  const [usrName, setUsrName] = useState(null);
  const [usrPic, setUsrPic] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userData = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/profile`
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
      // setEditContent()
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let editObj = {
      content: editContent,
      rating: editRating,
    };
    axios.patch(
      `${import.meta.env.VITE_LOCAL_URL}/reviews/${reviewId}`,
      editObj
    );
    navigate(`/games/${gameId}`);
  };

  if (editContent === null || editRating === null) {
    return <h1>...Loading</h1>;
  }

  return (
    <div>
      <h2>Editar Review</h2>
      <div>
        <img
          style={{
            height: "40px",
            width: "40px",
            overflow: "hidden",
            borderRadius: "40px",
          }}
          src={usrPic}
          alt=""
        />
        <p>User name: {usrName} </p>
      </div>
      <Form.Group onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rating:</Form.Label>
          <Form.Select
            type="number"
            name="rating"
            value={editRating}
            onChange={() => setEditRating(event.target.value)}
            required
            // min="1"
            // max="5"
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
        <Form.Group>
          <Form.Label>Review:</Form.Label>
          <Form.Control
            name="content"
            value={editContent}
            onChange={() => setEditContent(event.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Edit Review</Button>
      </Form.Group>
    </div>
  );
}

export default EditReviewPage;

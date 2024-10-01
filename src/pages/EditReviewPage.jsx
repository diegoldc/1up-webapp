import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
      <div style={{display:"flex",alignItems:"center"}}>
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
        <p style={{margin:"0px 0px 0px 10px",fontSize:"1.7rem"}}>{usrName} </p>
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
        <Form.Group>
          <Form.Label>Review:</Form.Label>
          <Form.Control
            className="bg-dark text-light"
            name="content"
            value={editContent}
            onChange={() => setEditContent(event.target.value)}
            required
          />
        </Form.Group>
        <button className="button3D" type="submit">Edit Review</button>
      </Form>
    </div>
  );
}

export default EditReviewPage;

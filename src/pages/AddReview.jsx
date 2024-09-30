import { useState , useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddReviewPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    screenshots: [],
    rating: '',
    content: '',
    gameId: gameId
  });
  const [ usrName , setUsrName ] = useState(null)
  const [ usrPic , setUsrPic ] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/profile`)
      setUsrName(response.data[0].user)
      setUsrPic(response.data[0].profilePic)
    } catch (error) {
      console.log("FATAL ERROR", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = {
        ...formData,
        userName: usrName,
        profilePic: usrPic,
        rating: parseInt(formData.rating),
        gameId: parseInt(gameId)
      };

      await axios.post(`${import.meta.env.VITE_LOCAL_URL}/reviews`, newReview);
      
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.log('Error al crear la review:', error);
    }
  };

  if(usrName === null || usrPic === null) {
    return (<h1>...Loading</h1>)
  }

  return (
    <div>
      <h2>Añadir Review</h2>
        <div>
          <img style={{height:"40px",width:"40px",overflow:"hidden",borderRadius:"40px"}} src={usrPic} alt="" />
          <p>User name: {usrName} </p>
        </div>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label>Rating:</Form.Label>
          <Form.Select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
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
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Enviar Review</Button>
      </Form>
    </div>
  );
}

export default AddReviewPage;
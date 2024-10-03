import { useState , useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Spinner from '../components/Spinner';

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
  const [ userId , setUserId ] = useState(null)
  const [ gameName , setGameName ] = useState(null)
  const [ wouldRecommend , setWouldRecommend ] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/profiles`)
      setUsrName(response.data[0].user)
      setUsrPic(response.data[0].profilePic)
      setUserId(response.data[0].id)
    } catch (error) {
      console.log("FATAL ERROR", error)
    }
    try {
      const gameNameData = await axios.get(`${import.meta.env.VITE_RAWG_URL}/games/${gameId}${import.meta.env.VITE_RAWG_KEY}`)
      setGameName(gameNameData.data.name)
    } catch (error) {
      console.log("get game name",error)
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
        gameName,
        profileId: userId,
        userName: usrName,
        profilePic: usrPic,
        rating: parseInt(formData.rating),
        gameId: parseInt(gameId)
      }

      await axios.post(`${import.meta.env.VITE_LOCAL_URL}/reviews`, newReview);
      
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.log('Error al crear la review:', error);
    }
  };

  const handleChecked = () => {
    if(wouldRecommend === false){
      setWouldRecommend(true)
    } else{
      setWouldRecommend(false)
    }
  }

  if(usrName === null || usrPic === null) {
    return (<Spinner />)
  }

  return (
    <div>
      <h1>Add a new Review</h1>
      <h3>{gameName}</h3>
        <div>
          <img style={{height:"40px",width:"40px",overflow:"hidden",borderRadius:"40px"}} src={usrPic} alt="" />
          <p>User name: {usrName} </p>
        </div>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">


          <Form.Label>Rating:</Form.Label>
          <Form.Select
            className="bg-dark text-light"
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
            className="bg-dark text-light revContainer"
            as="textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
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
        <button className="button3D" type="submit">Send</button>
      </Form>
    </div>
  );
}

export default AddReviewPage;
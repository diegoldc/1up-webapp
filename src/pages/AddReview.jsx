import { useState , useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <form onSubmit={handleSubmit}>
        <div>
          <img style={{height:"40px",width:"40px",overflow:"hidden",borderRadius:"40px"}} src={usrPic} alt="" />
          <p>User name: {usrName} </p>
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar Review</button>
      </form>
    </div>
  );
}

export default AddReviewPage;

import { useState , useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function EditReviewPage() {

  const {gameId,reviewId} = useParams()
  const navigate = useNavigate()
  
  const [ editContent , setEditContent ] = useState("")
  const [ editRating , setEditRating ] = useState("")
  const [ usrName , setUsrName ] = useState(null)
  const [ usrPic , setUsrPic ] = useState(null)

  useEffect(() => {
    getData()
  } ,[])
  
  const getData = async () => {
    try {
      const userData = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/profile`)
      setUsrName(userData.data[0].user)
      setUsrPic(userData.data[0].profilePic)
    } catch (error) {
      console.log(error)
    }
    try {
      const revData = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/reviews/${reviewId}`)
      setEditContent(revData.data.content)
      setEditRating(revData.data.rating)
      // setEditContent()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let editObj = {
      content: editContent,
      rating: editRating
    }
    axios.patch(`${import.meta.env.VITE_LOCAL_URL}/reviews/${reviewId}`,editObj)
    navigate(`/games/${gameId}`)
  }

  
  if(editContent === null || editRating === null){
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
          value={editRating}
          onChange={() => setEditRating(event.target.value)}
          required
          min="1"
          max="5"
        />
      </div>
      <div>
        <label>Review:</label>
        <textarea
          name="content"
          value={editContent}
          onChange={() => setEditContent(event.target.value)}
          required
        />
      </div>
      <button type="submit">Edit Review</button>
    </form>
  </div>
  )
}

export default EditReviewPage
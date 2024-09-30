import { Link } from "react-router-dom"
import axios from "axios"

function ReviewCard({content,profilePic,userName,rating,screenshots,usrName,id,gameId, onDelete}) {


  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/reviews/${id}`)
      onDelete(id)
    } catch (error) {
      console.log("FATAL ERROR", error)
    }
  }

  return (
    <div style={{border:"1px solid white", margin:"10px"}}>
      <img style={{height:"40px",width:"40px",overflow:"hidden",borderRadius:"40px"}} src={profilePic} alt="profilePic" />
      <h3>{userName}</h3>
      <p>Rating: {rating}</p>
      <p>{content}</p>
      {usrName===userName && (
        <>
        <Link to={`/games/${gameId}/editReview/${id}`}>
        <button>edit</button>
        </Link>
        <button onClick={handleDelete} >delete</button>
        </>
      )}
    </div>
  )
}

export default ReviewCard
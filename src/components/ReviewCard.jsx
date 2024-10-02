import { Link } from "react-router-dom"
import axios from "axios"
import logo from "../assets/1upLogo.png"

function ReviewCard({content,profilePic,userName,rating,usrName,id,gameId, onDelete,gameName,oneUser}) {

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/reviews/${id}`)
      onDelete(id)
    } catch (error) {
      console.log("FATAL ERROR", error)
    }
  }

  return (
    <div style={{border:"1px solid white", margin:"10px", paddingTop: "5px"}}>
      {oneUser && <h2>{gameName}</h2>}
      <img style={{height:"40px",width:"40px",overflow:"hidden",borderRadius:"40px"}} src={profilePic===null? logo : profilePic} alt="profilePic" />
      <h3>{userName}</h3>
      <p>Rating: {rating}</p>
      <p>{content}</p>
      {usrName===userName && (
        <>
        <Link to={`/games/${gameId}/editReview/${id}`}>
        <button className="button3D">Edit</button>
        </Link>
        <button className="button3D" onClick={handleDelete} >Delete</button>
        </>
      )}
    </div>
  )
}

export default ReviewCard
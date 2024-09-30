
function ReviewCard({content,profilePic,userName,rating,screenshots}) {
  return (
    <div style={{border:"1px solid white", margin:"10px"}}>
      <img src={profilePic} alt="profilePic" />
      <h3>{userName}</h3>
      <p>Rating: {rating}</p>
      <p>{content}</p>
    </div>
  )
}

export default ReviewCard
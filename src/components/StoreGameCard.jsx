
function StoreGameCard({name,rating,background_image,tags}) {



  return (
    <article className="storeGameCard" style={{border:"1px solid black"}}>
      <img src={background_image} style={{height:"50px"}} alt="" />
      <h3>{name}</h3>
      <p>rating: {rating}</p>
      <p>{tags[8].name} </p>
      <p>{tags[5].name} </p>
      <p>{tags[6].name} </p>
    </article>
  )
}

export default StoreGameCard
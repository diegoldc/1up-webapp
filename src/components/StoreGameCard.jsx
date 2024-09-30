
function StoreGameCard({name,rating,background_image,tags}) {
  // let randNum
  // (tags.length > 2) && randNum = Math.floor(Math.random() * tags)-3


  return (
    <article className="storeGameCard" style={{border:"1px solid black"}}>
      <img src={background_image} style={{height:"50px"}} alt="" />
      <h3>{name}</h3>
      <p>rating: {rating}</p>
      {/* {tags.length > 2 ? (
        <>
        <p>{tags[Math.floor(randNum)].name}</p>
        <p>{tags[Math.floor(randNum +1)].name}</p>
        <p>{tags[Math.floor(randNum +2)].name}</p>
        </>
      ) : ( null) } */}
      <p>{tags[0].name} </p>
      {/* // <p>{tags[1].name} </p> */}
      {/* <p>{tags[2].name} </p> */}
    </article>
  )
}

export default StoreGameCard
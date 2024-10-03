


function PlayPage() {

  const video = "xvFZjo5PgG0"
  return (

    <iframe
    src={`https://www.youtube.com/embed/${video}?autoplay=1&controls=0`}
    style={{width:"70%",height:"60vh"}}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen></iframe>

  )
}



{/* <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
<iframe
  src={`https://www.youtube.com/embed/${videoId}`}
  title="YouTube Video"
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
</div> */}

export default PlayPage
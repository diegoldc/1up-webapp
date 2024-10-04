function PlayPage() {
  const video = "xvFZjo5PgG0";
  return (
    <iframe
      src={`https://www.youtube.com/embed/${video}?autoplay=1&controls=0`}
      style={{ width: "70%", height: "60vh" }}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}


export default PlayPage;

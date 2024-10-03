import { Carousel } from "react-bootstrap";


function CarouselScreen({cover, screenshots}) {

  const picArray = [cover,...screenshots]
  return (
    <Carousel className="carousel" >
        {picArray.map((eachPic, index) => {
          return(
            <Carousel.Item key={index} interval={2000}>
              <img style={{height:"40vw",maxHeight:"250px", borderRadius:"15px"}} src={eachPic} alt="" />
            </Carousel.Item>
          )
        })}
    </Carousel>
  );
}
export default CarouselScreen
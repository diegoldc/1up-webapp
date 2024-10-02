import { Carousel } from "react-bootstrap";


function CarouselScreen({cover, screenshots}) {

  const picArray = [cover,...screenshots]
  return (
    <Carousel style={{}}>
        {picArray.map((eachPic, index) => {
          return(
            <Carousel.Item key={index} interval={2000}>
              <img style={{height:"40vw",maxHeight:"250px"}} src={eachPic} alt="" />
            </Carousel.Item>
          )
        })}
    </Carousel>
  );
}
export default CarouselScreen
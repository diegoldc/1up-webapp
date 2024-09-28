import { Link } from "react-router-dom"
function NavBar() {
  return (
    <nav className="navBar">
      <ul>

      <Link to={"/"} ><img src="" alt="NavImg" style={{color:"white"}}/></Link>
      <Link to={"/library"} ><img src="" alt="NavImg" style={{color:"white"}}/></Link>
      <Link to={"/cart"} ><img src="" alt="NavImg" style={{color:"white"}} /></Link>
      <Link to={"/profile"} ><img src="" alt="NavImg" style={{color:"white"}}/></Link>

      </ul>
    </nav>
  )
}

export default NavBar
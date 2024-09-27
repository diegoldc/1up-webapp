import { Link } from "react-router-dom"
function NavBar() {
  return (
    <nav>
      <Link to={"/store"} ><img src="" alt="NavImg" /></Link>
      <Link to={"/library"} ><img src="" alt="NavImg" /></Link>
      <Link to={"/cart"} ><img src="" alt="NavImg" /></Link>
      <Link to={"/profile"} ><img src="" alt="NavImg" /></Link>
    </nav>
  )
}

export default NavBar
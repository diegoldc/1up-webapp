import { Link } from "react-router-dom"
import imgHome from '../assets/home.png'
import imgLibrary from '../assets/library.png'
import { useEffect, useState } from "react"
import axios from "axios"
import appLogo from '../assets/1upLogo.png'


function NavBar() {

  const [profile, setProfile] = useState(appLogo)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/profile`)
    setProfile(response.data[0].profilePic)
  }

  return (
    <nav className="navBar">
      <ul>

      <Link className="navButton" to={"/"} ><img src={imgHome} alt="NavImg"/></Link>
      <Link className="navButton" to={"/vault"} ><img src={imgLibrary} style={{height:"45px", width:"45px",margin:"2.5px"}} alt="NavImg"/></Link>
      <Link className="navButton" to={"/profile"} ><img className="navBarProfile" src={profile} alt="NavImg"/></Link>

      </ul>
    </nav>
  )
}

export default NavBar
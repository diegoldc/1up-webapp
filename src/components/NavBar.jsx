import { Link } from "react-router-dom"
import imgHome from '../assets/home.png'
import imgLibrary from '../assets/library.png'
import imgCart from '../assets/cart.png'
import loadImg from "../assets/black.jpg"
import { useEffect, useState } from "react"
import axios from "axios"


function NavBar() {

  const [profile, setProfile] = useState(loadImg)

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

      <Link to={"/"} ><img src={imgHome} alt="NavImg"/></Link>
      <Link to={"/library"} ><img src={imgLibrary} alt="NavImg"/></Link>
      <Link to={"/profile"} ><img className="navBarProfile" src={profile} alt="NavImg"/></Link>

      </ul>
    </nav>
  )
}

export default NavBar
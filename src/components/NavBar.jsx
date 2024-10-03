import { Link } from "react-router-dom"
import imgHome from '../assets/home.png'
import imgLibrary from '../assets/library.png'
import imgMyReviews from '../assets/my-reviews.png'
import { useEffect, useState } from "react"
import axios from "axios"
import appLogo from '../assets/1upLogo.png'


function NavBar() {

  const [profile, setProfile] = useState(appLogo)
  const [ userId , setUserId ] = useState(null)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/profiles`)
      setProfile(response.data[0].profilePic)
      setUserId(response.data[0].id)
    } catch (error) {
      console.log("fetch profile",error)
    }
  }

  return (
    <nav className="navBar">
      <ul>

      <Link className="navButton" to={"/"} ><img src={imgHome} alt="NavImg"/></Link>
      <Link className="navButton" to={"/vault"} ><img src={imgLibrary} style={{height:"45px", width:"45px",margin:"2.5px"}} alt="NavImg"/></Link>
      <Link className="navButton" to={`/myReviews/${userId}`} ><img src={imgMyReviews} style={{height:"45px", width:"45px",margin:"2.5px"}} alt="NavImg"/></Link>
      <Link className="navButton" to={"/profiles"} ><img className="navBarProfile" src={profile} alt="NavImg"/></Link>

      </ul>
    </nav>
  )
}

export default NavBar
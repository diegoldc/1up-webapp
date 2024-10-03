import { useEffect, useState } from "react"
import axios from "axios"
import Spinner from '../components/Spinner';
import { Link } from "react-router-dom";

function ProfilePage() {

  const [profile, setProfile] = useState(null)


  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/profiles`)
    setProfile(response.data[0])
  }

  if (profile === null) {
    return <Spinner />
  }

  return (
    <div className="profilePage">
      <img className="profPic" src={profile.profilePic} alt="foto" />

      <h2>{profile.user}</h2>
      
      <div>
      <Link to={`/vault/`}>
      <button className="button3D">Go to my Vault</button>
      </Link>

      <Link to={`/myReviews/${profile.id}`}>
      <button className="button3D">See my Reviews</button>
      </Link>
      </div>
    
    </div>
  )
}

export default ProfilePage
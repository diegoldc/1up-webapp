import { useEffect, useState } from "react"
import axios from "axios"
import Spinner from '../components/Spinner';

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
    <div>
      <img style={{width:"150px"}} src={profile.profilePic} alt="foto" />

      <p>{profile.user}</p>
    </div>
  )
}

export default ProfilePage
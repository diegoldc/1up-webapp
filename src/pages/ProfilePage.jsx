import { useEffect, useState } from "react"
import axios from "axios"

function ProfilePage() {

  const [profile, setProfile] = useState(null)


  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/profile`)
    setProfile(response.data[0])
  }

  if (profile === null) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <img style={{width:"150px"}} src={profile.profilePic} alt="foto" />

      <p>{profile.user}</p>
    </div>
  )
}

export default ProfilePage
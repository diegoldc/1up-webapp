import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function HomePage() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/home')
  },[])
  return(
    <></>
  )
}

export default HomePage
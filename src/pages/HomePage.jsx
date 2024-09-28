import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function HomePage() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/store')
  },[])
  return(
    <></>
  )
}

export default HomePage
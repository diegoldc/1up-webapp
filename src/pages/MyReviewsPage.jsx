import axios from "axios"
import { useState , useEffect } from "react"
import { Link , useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import ReviewCard from "../components/ReviewCard"


function MyReviews() {

  const {userId} = useParams()
  const [ allMyReviews , setAllMyReviews ] = useState(null)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const reviewsData = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/reviews?profileId=${userId}`)
      console.log(reviewsData.data)
      setAllMyReviews(reviewsData.data)
    } catch (error) {
      console.log("get user", error)
    }
  }

  if(allMyReviews === null) {
    return (<Spinner />)
  }

  return (
    <>
    <h1>All your Reviews</h1>
    {allMyReviews.map((eachReview) => {
      return (
        <ReviewCard
        oneUser={true}
        key={eachReview.id}
        {...eachReview}
        usrName={eachReview.userName}
        />
      )
    })}
    </>
  )
}

export default MyReviews
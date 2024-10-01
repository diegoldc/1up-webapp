
import { Route , Routes } from 'react-router-dom'
import StorePage from './pages/StorePage'
import NavBar from './components/NavBar'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import './App.css'
import GamePage from './pages/GamePage'
import AddReview from './pages/AddReview'
import EditReviewPage from './pages/EditReviewPage'
import ProfilePage from './pages/ProfilePage'
import Library from './pages/Library'
import imgLogo from './assets/1upLogo.png'
import FilteredSearch from './pages/FilteredSearch'
import MyGamePage from './pages/MyGamePage'

function App() {
  
  return (
    <>
    <img 
    className='pageLogo'
      src={imgLogo} 
      style={{
        width: "45px",
        height: "45px"                        
      }} 
      alt="LOGO" 
    />
    <NavBar />

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/home' element={<StorePage />} />
      <Route path='/games/:gameId' element={<GamePage />} />
      <Route path='/games/:gameId/addReview' element={<AddReview />} />
      <Route path='/games/:gameId/editReview/:reviewId' element={<EditReviewPage/>}  />
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/library' element={<Library/>} />
      <Route path='/search/:filterName/:filterId' element={<FilteredSearch/>} />
      <Route path='/myGames/:myGameId' element={<MyGamePage />} />


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  )
}

export default App

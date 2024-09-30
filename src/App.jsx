
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
import imgLogo from './assets/1upLogo.svg'

function App() {
  
  return (
    <>
    <NavBar />
    <img 
          src={imgLogo} 
          style={{
            maxWidth: '100%',       
            maxHeight: '100%',     
            height: '100px',       
            width: '400px',                   
          }} 
          alt="LOGO" 
        />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/store' element={<StorePage />} />
      <Route path='/games/:gameId' element={<GamePage />} />
      <Route path='/games/:gameId/addReview' element={<AddReview />} />
      <Route path='/games/:gameId/editReview/:reviewId' element={<EditReviewPage/>}  />
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/library' element={<Library/>} />


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  )
}

export default App

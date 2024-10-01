
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
import { Link } from 'react-router-dom'

function App() {
  
  return (
    <>
    <NavBar />
    <div>
        <img 
          src={imgLogo} 
          style={{
            width: "100px",
            height: "100px"                        
          }} 
          alt="LOGO" 
        />
        
        <nav style={{ margin: "20px 0", display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link to="/tops" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Tops</Link>
          <Link to="/news" style={{ textDecoration: 'none', fontWeight: 'bold' }}>News</Link>
          <Link to="/deals" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Deals</Link>
          <Link to="/platforms" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Platforms</Link>
        </nav>

      </div>
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

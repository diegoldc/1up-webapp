import { useState } from 'react'
import { Route , Routes } from 'react-router-dom'
import StorePage from './pages/StorePage'
import NavBar from './components/NavBar'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import './App.css'
import GamePage from './pages/GamePage'
import AddReview from './pages/AddReview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
    <img src="" alt="LOGO" />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/store' element={<StorePage />} />
      <Route path='/games/:gameId' element={<GamePage />} />
      <Route path='/games/:gameId/addReview' element={<AddReview />} />


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  )
}

export default App

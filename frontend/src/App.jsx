import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Stats from './pages/Stats'
import Explore from './pages/Explore'
import Challenges from './pages/Challenges'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  if (currentPage === 'landing') {
    return <Landing onEnter={() => setCurrentPage('home')} />
  }

  const pages = {
    home: <Home />,
    challenges: <Challenges />,
    chat: <Chat />,
    stats: <Stats />,
    explore: <Explore />,
  }

  return (
    <div className="app-wrapper">
      <div className="page-content">
        {pages[currentPage] || <Home />}
      </div>
      <BottomNav current={currentPage} onChange={setCurrentPage} />
    </div>
  )
}

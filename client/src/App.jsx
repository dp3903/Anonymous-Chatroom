import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateRoom from './pages/createRoom'
import JoinRoom from './pages/joinRoom'
import Home from './pages/Home'
import ChatRoom from './pages/ChatRoom'

function App() {
  
  return (
    
        <Router>
          <Routes>
            <Route path='/createRoom' element={<CreateRoom/>} />
            <Route path='/joinRoom' element={<JoinRoom/>} />
            <Route path='/chatRoom' element={<ChatRoom/>} />
            <Route path='/' element={<Home/>} />
          </Routes>
        </Router>
      
  )
}

export default App

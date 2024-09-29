import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import Home from './pages/Home'
import ChatRoom from './pages/ChatRoom'
import { ChakraProvider,ColorModeScript } from '@chakra-ui/react'
import theme from './theme';

function App() {
  
  return (
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <Routes>
            <Route path='/createRoom' element={<CreateRoom/>} />
            <Route path='/joinRoom' element={<JoinRoom/>} />
            <Route path='/chatRoom' element={<ChatRoom/>} />
            <Route path='/' element={<Home/>} />
          </Routes>
        </Router>
      </ChakraProvider>
      
  )
}

export default App

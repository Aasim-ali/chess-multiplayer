import { useSocketSetup } from './utils/socketEventHandler'
import Header from './components/Header'
import Online from './pages/Online'
import { Route, Routes } from 'react-router-dom'
import Offline from './pages/Offline'
import { useSelector } from 'react-redux'



const App = () => {
  const mode = useSelector(s => s.game.mode)
  const path = 'https://chess-multiplayer-fcfr.onrender.com' //https://chess-multiplayer-fcfr.onrender.com
  useSocketSetup(path, mode)
  
  return (
    <div className='h-[100vh] w-[100%]  bg-linear-to-bl from-black to-gray-700 '>
      <Header/>
      <Routes>
        <Route path='/' element={<Online/>}/>
        <Route path='/offline' element={<Offline/>}/>
      </Routes>
    </div>
  )
}

export default App
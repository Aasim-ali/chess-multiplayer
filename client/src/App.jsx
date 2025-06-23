import React, { useEffect } from 'react'

import ChessBoard from './components/ChessBoard'
import StatusBar from './components/StatusBar'
import socketService from './services/SocketService'
import {useDispatch} from 'react-redux'

import {
  setGameStatus,
  receiveMove,
  opponentLeft,
  setMyColor
} from './redux/gameSlice'
import StartGame from './components/StartGame'



const App = () => {
  const path = 'http://172.22.102.169:3000'
  const dispatch = useDispatch()
  useEffect(()=>{
    const setup = async() =>{
      await socketService.connect(path)

      socketService.on('waiting-for-opponent', () => {
        dispatch(setGameStatus('waiting'))
        console.log("waiting for opp");
        
      })

      socketService.on('game-started', ({ color }) => {
        dispatch(setMyColor(color))
        dispatch(setGameStatus('playing'))
      })

      socketService.on('receive-move', (move) => {
        dispatch(receiveMove(move))
        console.log('Received opponent move:', move)
      })

      socketService.on('opponent-left', () => {
        dispatch(opponentLeft())
        alert('Opponent has left the game.')
      })
    }
    setup()
    return () => {
      socketService.off('waiting-for-opponent')
      socketService.off('game-started')
      socketService.off('receive-move')
      socketService.off('opponent-left')
      socketService.disconnect()
    }
  }, [dispatch])
  
  return (
    <div className='h-[100vh] w-[100%] flex flex-col justify-center items-center gap-12 bg-gray-200'>
      <ChessBoard />
      <StatusBar />
      <StartGame />
    </div>
  )
}

export default App
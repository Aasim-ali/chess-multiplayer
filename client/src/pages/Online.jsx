import React from 'react'
import ChessBoard from '../components/ChessBoard'
import StatusBar from '../components/StatusBar'
import StartGame from '../components/StartGame'

const Online = () => {
  return (
    <div className='flex flex-col items-center gap-6 h-[80%] w-full'>
        <ChessBoard />
        <StatusBar />
        <StartGame />
    </div>
  )
}

export default Online
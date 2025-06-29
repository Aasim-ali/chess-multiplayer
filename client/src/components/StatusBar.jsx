import React from 'react'
import { useSelector } from 'react-redux'

const StatusBar = () => {
  const opponentConnected = useSelector(state => state.game.opponentConnected)
  const isMyTurn = useSelector(state => state.game.isMyTurn)
  const status = useSelector(state => state.game.status)
  return (
    <div className='border-1 border-white text-white w-full max-w-[480px] rounded-lg  py-2 flex justify-center gap-4 font-[cursive] text-sm sm:text-lg'>
        <span>{isMyTurn && "Your Turn" }</span> <span>{status}</span>
    </div>
  )
}

export default StatusBar
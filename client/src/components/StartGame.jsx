import React, { use } from 'react'
import socketService from '../services/SocketService'
import { useSelector, useDispatch } from 'react-redux'
import { opponentLeft } from '../redux/gameSlice'


const StartGame = () => {
    const dispatch = useDispatch()
    const handleExit = ()=>{
        socketService.off('waiting-for-opponent')
        socketService.off('game-started')
        socketService.off('receive-move')
        socketService.off('opponent-left')
        socketService.disconnect()
        dispatch(opponentLeft())
    }
    const status = useSelector(state=> state.game.status)
    const handleStart = () =>{
        if(status!=="Please start the game.."){
            handleExit()
            return
        }
        socketService.emit('start-game')
    }
  return (
    <div className='bg-[#b58863] text-black w-full max-w-[480px] rounded-lg  text-center py-2 cursor-pointer hover:shadow-lg font-[cursive] text-sm sm:text-lg'
        onClick={handleStart}
    >
        {
            status === "Please start the game.."? "Start Game":"Exit/Admin Defeat"
        }
    </div>
  )
}

export default StartGame
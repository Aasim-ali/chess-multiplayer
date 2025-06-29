import socketService from '../services/SocketService'
import { useSelector, useDispatch } from 'react-redux'
import { opponentLeft, setGameStatus } from '../redux/gameSlice'
import { disconnectHandler } from '../utils/socketDisconnectHandler'


const StartGame = () => {
    const dispatch = useDispatch()
    const mode = useSelector(s => s.game.mode)
    const handleExit = ()=>{
        mode==="online" && disconnectHandler()
        dispatch(opponentLeft())
    }
    const status = useSelector(state=> state.game.status)
    const handleStart = () =>{
        if(mode==="offline" ){
            if(status!=="Please start the game.."){
                handleExit()
                return
            }
            dispatch(setGameStatus("playing"))
            alert("Game has been started, enjoy the game..")
        }
        if(status!=="Please start the game.."){
            handleExit()
            return
        }
        socketService.emit('start-game')
    }
  return (
    <div className='border-1 border-white text-white px-4 rounded-lg  text-center py-2 cursor-pointer hover:shadow-sm hover:shadow-white font-[cursive] text-sm sm:text-lg'
        onClick={handleStart}
    >
        {
            status === "Please start the game.."? "Start Game":"Exit/Admin Defeat"
        }
    </div>
  )
}

export default StartGame
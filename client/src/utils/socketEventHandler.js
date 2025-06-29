import { useEffect } from "react"
import { useDispatch } from "react-redux"
import socketService from "../services/SocketService"
import {
  opponentLeft,
  receiveMove,
  setGameStatus,
  setMyColor,
  setMode
} from "../redux/gameSlice"
import { disconnectHandler } from "./socketDisconnectHandler"

export const useSocketSetup = (path, mode ) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if(mode === "offline") return 
    const setup = async () => {
      await socketService.connect(path).catch(_=>{
        dispatch(setMode("offline"))
      })

      socketService.on('waiting-for-opponent', () => {
        dispatch(setGameStatus('waiting'))
      })

      socketService.on('game-started', ({ color }) => {
        dispatch(setMyColor(color))
        dispatch(setGameStatus('playing'))
        alert("Game has been started, enjoy the game..")
      })

      socketService.on('receive-move', (move) => {
        dispatch(receiveMove(move))
      });

      socketService.on('opponent-left', () => {
        dispatch(opponentLeft())
        alert('Opponent has left the game.')
      })
    }

    setup()

    return () => {
      disconnectHandler()
      dispatch(opponentLeft())
    }
  }, [dispatch, mode])
}

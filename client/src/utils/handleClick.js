import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSquare } from '../redux/gameSlice'
import { makeMove } from './makeMove'

export const useHandleSquareClick = () => {
  const dispatch = useDispatch()
  const board = useSelector(state => state.game.board)
  const selectedSquare = useSelector(state => state.game.selectedSquare)
  const status = useSelector(state => state.game.status)
  const isMyTurn = useSelector(state => state.game.isMyTurn)
  const mode = useSelector(state => state.game.mode)
  const myColor = useSelector(state => state.game.myColor)

  const getSquareName = (row, col) => {
    const files = 'abcdefgh'
    return files[col] + (8 - row)
  }

  const handleSquareClick = (row, col) => {
    if((!myColor) && (!isMyTurn) && mode === "online") return
    console.log("bc")
    if(status === "Please start the game.." && mode === "offline") return

    const square = getSquareName(row, col)
    const piece = board[row][col]

    if (!selectedSquare) {
      if (piece) dispatch(setSelectedSquare(square))
    } else {
      if (selectedSquare === square) {
        dispatch(setSelectedSquare(null))
        return
      }

      const fromPiece = board[8 - parseInt(selectedSquare[1])][selectedSquare.charCodeAt(0) - 97]
      const toPiece = piece

      if (toPiece && fromPiece && toPiece.color === fromPiece.color) {
        dispatch(setSelectedSquare(square)) 
      } else {
        dispatch(makeMove({ from: selectedSquare, to: square }))
        dispatch(setSelectedSquare(null))
      }
    }
  }

  return handleSquareClick
}

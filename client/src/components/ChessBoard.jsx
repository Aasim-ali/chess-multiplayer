import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Square from './Square'
import { makeMove, setSelectedSquare } from '../redux/gameSlice'

const ChessBoard = () => {
  const dispatch = useDispatch()
  const board = useSelector(state => state.game.board)
  const selectedSquare = useSelector(state => state.game.selectedSquare)
  const status = useSelector(state => state.game.status)
  const isMyTurn = useSelector(state => state.game.isMyTurn)
  const myColor = useSelector(state => state.game.myColor)
  

  const getSquareName = (row, col) => {
    const files = 'abcdefgh'
    return files[col] + (8 - row)
  }

  const handleSquareClick = (row, col) => {
    if(status ==="Please start the game.." && (!isMyTurn)) return

    const square = getSquareName(row, col)
    const piece = board[row][col]
  
    console.log('Clicked:', square, 'Piece:', piece)
  
    if (!selectedSquare) {
      
      if (piece) {
        dispatch(setSelectedSquare(square))
      }
    } else {
      
      if (selectedSquare === square) {
        dispatch(setSelectedSquare(square))
        return
      }
  
      
      const fromPiece = board[8 - parseInt(selectedSquare[1])][selectedSquare.charCodeAt(0) - 97]
      const toPiece = piece
  
      if (
        toPiece &&
        fromPiece &&
        toPiece.color === fromPiece.color
      ) {
        dispatch(setSelectedSquare(square)) 
      } else {
        dispatch(makeMove({ from: selectedSquare, to: square }))
        dispatch(setSelectedSquare(null))
      }
    }
  }

  return (
    <div className={`grid grid-cols-8 grid-rows-8 w-full max-w-[480px] sm:h-[100vw] aspect-square max-h-[480px] shadow-xl ${(myColor && myColor === 'black') && 'rotate-180'}`}>
      {
        board.flatMap((row, rowIndex) =>
          row.map((square, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              piece={square}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            />
          ))
        )
      }
    </div>
  )
}

export default ChessBoard

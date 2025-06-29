import React from 'react'
import { useSelector } from 'react-redux'
import Square from './Square'
import { useHandleSquareClick } from '../utils/handleClick'

const ChessBoard = () => {
  const board = useSelector(state => state.game.board)
  const myColor = useSelector(state => state.game.myColor)
  const handleSquareClick = useHandleSquareClick()

  return (
    <div className={`grid grid-cols-8 grid-rows-8 w-full max-w-[480px] sm:h-[100vw] aspect-square max-h-[480px] shadow-2xl ${(myColor && myColor === 'black') && 'rotate-180'}`}>
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

import React from 'react'
import { useSelector } from 'react-redux';

const pieceIcons = {
    wp: '♙', bp: '♙',
    wr: '♖', br: '♜',
    wn: '♘', bn: '♞',
    wb: '♗', bb: '♝',
    wq: '♕', bq: '♛',
    wk: '♔', bk: '♚',
}

const Square = ({ row, col, piece, onClick }) => {
    const isDark = (row + col) % 2 === 1;
    const code = piece ? piece.color + piece.type : null;
    const myColor = useSelector(state => state.game.myColor)
  
    return (
      <div
        className={`sm:w-[60px] max-w-[60px] sm:h-[60px] max-w-[60px] flex items-center justify-center cursor-pointer text-2xl font-bold ${
          isDark ? '' : 'bg-gray-400'
        }  ${(myColor && myColor === 'black') && 'rotate-180'}`}
        onClick={onClick}
      >
        {code && (
          <span className={` drop-shadow-md ${
          code.startsWith('w') ? 'text-white' : 'text-slate-600'
        }`}>
            {pieceIcons[code]}
          </span>
        )}
      </div>
    )
}

export default Square
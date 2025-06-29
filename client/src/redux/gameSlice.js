import { createSlice,} from '@reduxjs/toolkit'
import { chessService } from '../services/ChessService'
import { makeMove } from '../utils/makeMove'

const initialState = {
  board: chessService.getBoard(),            
  selectedSquare: null,
  currentTurn: 'white',
  status: 'Please start the game..',
  myColor: null,
  isMyTurn: false,
  mode: "online",
}



const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {

      setBoard: (state, action) => {
        state.board = action.payload
      },

      setSelectedSquare: (state, action) => {
        state.selectedSquare = action.payload
      },

      switchTurn: (state) => {
        state.currentTurn = state.currentTurn === 'white' ? 'black' : 'white';
      },

      setGameStatus: (state, action) => {
        state.status = action.payload
      },

      resetGame: (state) => {
        chessService.reset()
        state.board = chessService.getBoard()
        state.selectedSquare = null
        state.currentTurn = 'white'
        state.status = 'playing'
      },

      setMyColor: (state, action) => {
        state.myColor = action.payload
        state.isMyTurn = action.payload === 'white' 
      },
      
      receiveMove: (state, action) => {
        const {from, to} = action.payload
        chessService.move(from, to)
        state.board = chessService.getBoard()
        state.currentTurn = chessService.turn() === 'w' ? 'white' : 'black'
        state.status = chessService.status().gameOver ? 'gameOver' : 'playing'
        state.isMyTurn = state.myColor === state.currentTurn
      },
      
      opponentLeft: (state) => {
        state.status = 'Please start the game..'
        state.isMyTurn = null
        chessService.reset()
        state.board = chessService.getBoard()
        state.currentTurn = 'white'
        state.selectedSquare = null
        state.myColor = null
      },

      setMode: (state, action) =>{
        state.mode = action.payload
        state.status = 'Please start the game..'
        state.isMyTurn = null
        chessService.reset()
        state.board = chessService.getBoard()
        state.currentTurn = 'white'
        state.selectedSquare = null
        state.myColor = null
      }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(makeMove.fulfilled , (state, action) => {
            console.log("✅ Move successful")
            state.board = action.payload.board
            state.currentTurn = action.payload.turn === 'w' ? 'white' : 'black'
            state.myColor 
            if(action.payload.status.gameOver) state.status = "Game Over"
            else if(action.payload.status.inCheck) state.status = "In Check"
            else state.status = "Playing"
        })
        .addCase(makeMove.rejected, (state, action) =>{
            console.warn("ye print ho rha hai each time chahe kuch bhi ho", "Invialid Move:", action.payload)
        })
    }
})

export const {
    setBoard,
    setSelectedSquare,
    switchTurn,
    setGameStatus,
    resetGame,
    setMyColor,
    receiveMove,
    opponentLeft,
    setMode,
} = gameSlice.actions
export default gameSlice.reducer
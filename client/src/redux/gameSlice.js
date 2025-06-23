import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { chessService } from '../services/ChessService'
import socketService from '../services/SocketService'

const initialState = {
  board: chessService.getBoard(),            
  selectedSquare: null,
  currentTurn: 'white',
  status: 'Please start the game..',
  myColor: null,
  isMyTurn: false,
}

export const makeMove = createAsyncThunk(
    'game/makeMove',
    async ({ from, to }, thunkAPI) => {
      try {
        const move = chessService.move(from, to)
        if (move) {
            
          socketService.emit('send-move', {from, to})

          const board = chessService.getBoard()
          const turn = chessService.turn()
          const status = chessService.status()

          return {
              board,
              turn,
              status
          }
          } else {
          console.log("❌ Invalid move")
          return thunkAPI.rejectWithValue('Invalid move')
          }
        } catch (error) {
            console.error("❌ Error inside makeMove:", error)
            return thunkAPI.rejectWithValue('Unexpected error')
        }
    }
)

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
      },
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
} = gameSlice.actions
export default gameSlice.reducer
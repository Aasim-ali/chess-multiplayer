import { createAsyncThunk } from '@reduxjs/toolkit'
import { chessService } from '../services/ChessService'
import socketService from '../services/SocketService'

export const makeMove = createAsyncThunk(
    'game/makeMove',
    async ({ from, to }, thunkAPI

) => {
    const mode = thunkAPI.getState(s => s.game.mode)
    try {
        const move = chessService.move(from, to)
        if (move) {     
            if(mode==="online") socketService.emit('send-move', {from, to})

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
import { Chess } from 'chess.js'

class ChessService {
  constructor() {
    this.chess = new Chess()
  }

  getBoard() {
    return this.chess.board()
  }

  move(from, to) {
    return this.chess.move({ from, to })
  }

  validMoves(square) {
    return this.chess.moves({ square, verbose: true })
  }

  turn() {
    return this.chess.turn()
  }

  reset() {
    this.chess.reset()
  }

  status() {
    return {
      inCheck: this.chess.inCheck(),
      gameOver: this.chess.isGameOver(),
    }
  }
}

export const chessService = new ChessService();
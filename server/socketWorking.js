export default function setupSocketEvents(io) {
  var waitingPlayer = null

  io.on('connection', (socket) => {
    
    socket.on('start-game', () => {
      console.log("recieved a request")
      
      if (!waitingPlayer) {
        waitingPlayer = socket
        socket.emit('waiting-for-opponent')
        console.log("opponent wannna connect")
        
      } else {
        const player1 = waitingPlayer
        const player2 = socket
  
        
        waitingPlayer = null
  
        
        player1.opponent = player2
        player2.opponent = player1
  
        player1.emit('game-started', { color: 'white' })
        player2.emit('game-started', { color: 'black' })
  
        
        player1.on('send-move', (move) => {
            player2.emit('receive-move', move)
          })
          
        player2.on('send-move', (move) => {
        player1.emit('receive-move', move)
        })
        
        
      }
    })
  
    
    socket.on('disconnect', () => {
        if (waitingPlayer && waitingPlayer.id === socket.id) {
            waitingPlayer = null
        }
    
        if (socket.opponent) {
            socket.opponent.emit('opponent-left')
            socket.opponent.opponent = null
            socket.opponent = null
        }
    })
  })
}
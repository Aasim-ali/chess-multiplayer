import socketService from "../services/SocketService"

export const disconnectHandler = () =>{
    socketService.off('waiting-for-opponent')
    socketService.off('game-started')
    socketService.off('receive-move')
    socketService.off('opponent-left')
    socketService.disconnect()
}
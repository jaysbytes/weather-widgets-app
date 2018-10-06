export default (socket) => {
  const { token } = socket.handshake.query
  if (token === undefined ) {
    socket.disconnect()
  }
  else {
    socket.token = token
    socket.join(token)
    socket.emit('ready')
  }
}
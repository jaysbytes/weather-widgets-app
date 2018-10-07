import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import expressBearerToken from 'express-bearer-token'
import _io from 'socket.io'
import http from 'http'

import mainRouter from './router'
import socketConnectionHandler from './socketConnectionHandler'

const port = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))
app.use(expressBearerToken())
app.use((req, res, next) => {
  if (!req.token || req.token.length !== 40) {
    res.status(403)
    res.send('Unauthorized')
  }
  next()
})
const server = http.Server(app)
const io = _io(server)

io.on('connection', socketConnectionHandler);

app.use(mainRouter(`http://localhost:${port}`, io))

server.listen(port, () => {
  console.log(`Server listen on ${port}`)
})
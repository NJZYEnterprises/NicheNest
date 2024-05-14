const express = require("express")
require('dotenv').config();
const server = express();
const path = require("path");

const apiRouter = require("./backend/api/index.cjs")
const authRouter = require("./backend/auth/index.cjs")



server.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/dist/index.html')
})

server.use(express.static(path.join(__dirname, './dist')))


server.use("/api", apiRouter)
server.use("/auth", authRouter)

server.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
})

module.exports= server
const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
require('dotenv').config();
const server = express();
const path = require("path");


server.use(morgan("dev")) // Morgan for logging HTTP requests
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())

const apiRouter = require("./backend/api/index.cjs")
const authRouter = require("./backend/auth/index.cjs")


server.use((req, res, next) => {
  console.log("<---- Body Logger START ---->")
  console.log(req.body)
  console.log("<----- Body Logger END ----->")
  next()
}) 

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
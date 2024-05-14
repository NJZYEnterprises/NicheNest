const express = require("express")
require('dotenv').config();
const server = express();

const apiRouter = require("./backend/api/index.cjs")
const authRouter = require("./backend/auth/index.cjs")

server.use("/api", apiRouter)
server.use("/auth", authRouter)

server.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
})

module.exports= server
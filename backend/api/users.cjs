const express = require('express')
const userRouter = express.Router();

userRouter.use("/users", userRouter)

userRouter.get("/", (req, res, next)=>{
  res.send(`this is the users route`)
})

module.exports = userRouter
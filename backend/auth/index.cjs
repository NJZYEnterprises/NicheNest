const express = require('express');
const authRouter = express.Router();

authRouter.get("/", (req, res, next)=>{
  res.send ( `This is the Auth Route`)
})


module.exports = authRouter
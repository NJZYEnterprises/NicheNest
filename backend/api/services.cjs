const express = require('express')
const serviceRouter = express.Router();

serviceRouter.use("/service", serviceRouter)

serviceRouter.get("/", (req, res, next)=>{
  res.send(`this is the service route`)
})

module.exports = serviceRouter
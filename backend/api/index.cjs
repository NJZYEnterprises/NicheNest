const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users.cjs');
const serviceRouter = require('./services.cjs');
const reviewRouter = require('./reviews.cjs');

apiRouter.use('/users', usersRouter);
apiRouter.use('/services', serviceRouter);
apiRouter.use('/reviews', reviewRouter);

apiRouter.get("/", (req, res, next)=>{
  res.send ( `This is the API Route`)
})

module.exports = apiRouter
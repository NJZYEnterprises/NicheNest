const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users.cjs');
const serviceRouter = require('./services.cjs');
const reviewRouter = require('./reviews.cjs');
const locationRouter = require('./locations.cjs');
const sessionRouter = require('./sessions.cjs');
const reservationRouter = require('./reservations.cjs');




apiRouter.use('/users', usersRouter);
apiRouter.use('/services', serviceRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/locations', locationRouter);
apiRouter.use('/sessions', sessionRouter);
apiRouter.use('/reservations', reservationRouter);


apiRouter.get("/", (req, res, next)=>{
  res.send ( `This is the API Route`)
})

module.exports = apiRouter
const express = require("express");
const prisma = require("../db/connection.cjs");
const myPrisma = require('../db/myPrisma.cjs');
const locationRouter = express.Router();

//get all locations
locationRouter.get("/", async (req, res) => {
  const location = await prisma.location.findMany();
  res.json(location);
});

//create locoation by userid
locationRouter.post('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const locationData = myPrisma.validate("Location", req.body);
    console.log('body',req.body)
    const newLocation = await prisma.location.create({
      data: {
        ...locationData,
        users: {
          connect: { id: parseInt(userId) }
        }
      }
    });
    res.send(newLocation)
  } catch (error) {
    next(error)
  }
})



//update locoation by location id
locationRouter.patch('/:id', async (req, res, next) => {
  try {
    const data = myPrisma.validate("Location", req.body);
    const editLocation = await prisma.location.update({ 
      where:{
        id: parseInt(req.params.id)
      }, 
      data });
    res.send(editLocation)
  } catch (error) {
    next(error)
  }
})


module.exports = locationRouter;




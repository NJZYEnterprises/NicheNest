const express = require('express');
const { verifyToken } = require('../auth/middleware.cjs');
const prisma = require('../db/connection.cjs');
const availabilityRouter = express.Router();

//create 
availabilityRouter.post('/', verifyToken, async (req, res, next) => {
  const data = myPrisma.validate("Availability", req.body);

  try {
    const newAvailability = await prisma.availability.create({
      data,
    });

    res.status(201).json(newAvailability);
  } catch (error) {
    next(error);
  }
});

//get availability
availabilityRouter.get('/:freelancerId/:serviceId', verifyToken, async (req, res, next) => {
  const { freelancerId, serviceId } = req.params;

  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        freelancerId: parseInt(freelancerId),
        serviceId: parseInt(serviceId)
      }
    });

    res.send(availabilities);
  } catch (error) {
    next(error);
  }
});



//update 
availabilityRouter.put('/:id', verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const data = myPrisma.validate("Availability", req.body);
  
  try {

    const updatedAvailability = await prisma.availability.update({
      where: {
        id: parseInt(id)
      },
      data,
    });

    res.json(updatedAvailability);
  } catch (error) {
    next(error);
  }
});

//Delete 
availabilityRouter.delete('/:id', verifyToken, async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.availability.delete({
      where: {

        id: parseInt(id)

      }
    });
      
  } catch (error) {
    next(error);
  }
});


module.exports = availabilityRouter;

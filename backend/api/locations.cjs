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
locationRouter.patch('/:uid/location', async (req, res, next) => {
  try {
    const { uid } = req.params;
    let { street_address, zip_code, city, state } = req.body;

    const user = await prisma.user.findUnique({
      where: { uid: uid }, 
      include: { location: true }
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    let updatedUser;
    if (user.location) {
      updatedUser = await prisma.user.update({
        where: { uid: uid }, 
        data: {
          location: {
            update: {
              street_address,
              zip_code,
              city,
              state
            }
          }
        },
        include: { location: true }
      });
    } else {
      if (!city) city = "Undisclosed";
      if (!state) state = "Undisclosed";
      updatedUser = await prisma.user.update({
        where: { uid: uid }, 
        data: {
          location: {
            create: {
              street_address,
              zip_code,
              city,
              state
            }
          }
        },
        include: { location: true }
      });
    }

    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});


module.exports = locationRouter;




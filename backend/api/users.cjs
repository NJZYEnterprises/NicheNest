const express = require("express")
const userRouter = express.Router()
const prisma = require("../db/connection.cjs")
userRouter.use("/users/", userRouter)
const myPrisma = require('../db/myPrisma.cjs');
const { verifyToken } = require("../auth/middleware.cjs");

//get all freelancers
userRouter.get("/freelancers/", async (req, res, next) => {
  try {
    const freelancers = await prisma.user.findMany({
      where: {
        services: { some: {} },
      },
      include: {
        images: true,
        reviews_received: true,
        location: true,
        services: true,
      },
    })
    res.send(freelancers)
  } catch (error) {
    next(error)
  }
})

//get single freelancer with services by id
userRouter.get('/freelancers/:id', async (req, res, next) => {
  try {
    const freelancers = await prisma.user.findUnique({
      where: {
        services: { some: {} },
        id: parseInt(req.params.id)
      },
      include: {
        images: true,
        reviews_received: true,
        services: true,
        location: true,
      },
    })
    res.send(freelancers)
  } catch (error) {
    next(error)
  }
})

//get everything needed for a users calendar, by their id
userRouter.get('/calendar/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        reservations: {
          include: { 
            session: {
              include: {
                service: {
                  include: { freelancer: true }
                }
              }
            } 
          }
        },
        services: {
          include: {
            freelancer: true,
            availabilities: true,
            sessions: {
              include: {
                reservations: {
                  include: {
                    client: true
                  }
                }
              }
            },
          }
        },
      },
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})

//get all users
userRouter.get('/', async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
  } catch (error) {
    next(error)
  }
})

//create single user by id
userRouter.post('/', verifyToken, async (req, res, next) => {
  try {
    const data = myPrisma.validate("User", req.body);
    if (data.uid !== req.user?.uid)
      return res.status(401).json({ message: 'Body uid does not match verified uid' });
    
    const newUser = await prisma.user.create({ data });
    res.send(newUser)
  } catch (error) {
    next(error)
  }
})
//update user by uid
userRouter.patch('/:userId', async (req, res, next) => {
  try {
    const data = myPrisma.validate("User", req.body);
    const editUser = await prisma.user.update({
      where: { uid: req.params.userId }, // Use uid instead of id
      data
    });
    res.send(editUser);
  } catch (error) {
    next(error);
  }
});
//delete single user by id
userRouter.delete('/:userId', async (req, res, next) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(req.params.userId)
      },
    })
    res.send(deletedUser)
  } catch (error) {
    next(error)
  }
})


module.exports = userRouter

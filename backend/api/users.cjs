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
      },
    })
    res.send(freelancers)
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

//get all user info by Uid
userRouter.get("/user/:uid", async (req, res, next) => {
  const { uid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
      include: {
        location: true,
        services: {
          include: {
            availabilities: true,
            sessions: {
              include: {
                reservations: true,
              },
            },
          },
        },
        links: true,
        images: true,
      },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});



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

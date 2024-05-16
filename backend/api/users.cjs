const express = require("express")
const userRouter = express.Router()

const prisma = require("../db/connection.cjs")

userRouter.use("/users/", userRouter)

const myPrisma = require('../db/myPrisma.cjs');

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

//get single user with services by id
userRouter.get('/freelancers/:id', async (req, res, next) => {
  try {
    const freelancers = await prisma.user.findUnique({
      where: {
        services: { some: {} },
        id: parseInt(req.params.id)
      }
    })
    res.send(freelancers)
  } catch (error) {
    next(error)
  }
})

//get all users
userRouter.get('/', async (req, res, next)=> {
  try {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
   } catch (error) {
    next(error)
  }
}) 

//get single user by id
userRouter.post('/', async (req, res, next) => {
  try {
    const data = myPrisma.validate("User", req.body);
    const newUser = await prisma.user.create({ data });
    res.send(newUser)
  } catch (error) {
    next(error)
  }
})

//update single user by id
userRouter.patch('/:userId', async (req, res, next) => {
  try {
    const data = myPrisma.validate("User", req.body);
    const editUser = await prisma.user.update({ 
      where:{
        id: parseInt(req.params.userId)
      },
      data });
    res.send(editUser)
  } catch (error) {
    next(error)
  }
})

//delete single user by id
userRouter.delete('/:userId', async (req, res, next) => {
  try {
    const deletedUser = await prisma.user.delete({ 
      where:{
        id: parseInt(req.params.userId)
      },
    }) 
    res.send(deletedUser)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/', async (req, res, next)=> {
  try {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
   } catch (error) {
    next(error)
  }
}) 

userRouter.post('/', async (req, res, next) => {
  try {
    const data = myPrisma.validate("User", req.body);
    const newUser = await prisma.user.create({ data });
    res.send(newUser)
  } catch (error) {
    next(error)
  }
})

userRouter.patch('/:userId', async (req, res, next) => {
  try {
    const data = myPrisma.validate("User", req.body);
    const editUser = await prisma.user.update({ 
      where:{
        id: parseInt(req.params.userId)
      },
      data });
    res.send(editUser)
  } catch (error) {
    next(error)
  }
})

userRouter.delete('/:userId', async (req, res, next) => {
  try {
    const deletedUser = await prisma.user.delete({ 
      where:{
        id: parseInt(req.params.userId)
      },
    }) 
    res.send(deletedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter

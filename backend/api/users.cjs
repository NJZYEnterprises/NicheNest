
const express = require('express')
const userRouter = express.Router();

const prisma = require('../db/connection.cjs')

userRouter.use("/users/", userRouter)

userRouter.get("/", (req, res, next)=>{
  res.send(`this is the users route`)
})

userRouter.get('/freelancers/', async(req, res, next)=>{
  try{
    const freelancers = await prisma.user.findMany ({
      where:{
        services: {some:{}}
      }
    })
    res.send(freelancers)
  }catch(error){
    next(error)
  }
})

userRouter.get('/freelancers/:id', async(req, res, next)=>{
  try{
    const freelancers = await prisma.user.findUnique ({
      where:{
        services: {some:{}},
        id: parseInt(req.params.id) 
      }
    })
    res.send(freelancers)
  }catch(error){
    next(error)
  }
})




module.exports = userRouter
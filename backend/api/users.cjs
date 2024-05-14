const { PrismaClient} = require('@prisma/client');
const express = require('express')
const userRouter = express.Router();

const prisma = new PrismaClient();

userRouter.use("/users/", userRouter)

userRouter.get("/", (req, res, next)=>{
  res.send(`this is the users route`)
})

userRouter.get('/freelancers/', async(req, res, next)=>{
  try{
    const freelancers = await prisma.user.findMany ({
      where:{
        services: !null
      }
    })
    res.send(freelancers)
  }catch(error){
    console.log(error);
    res.sendStatus(501)
  }
})




module.exports = userRouter
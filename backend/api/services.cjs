const express = require('express')
const serviceRouter = express.Router();

const prisma = require('../db/connection.cjs')
serviceRouter.use("/service", serviceRouter)

//get all services
serviceRouter.get("/", async (req, res, next) => {
  try {
    const allServices = await prisma.service.findMany();
    res.send(allServices)
  } catch (error) {
    next(error)
  }
})

//get service by name
serviceRouter.get("/:id", async (req, res, next) => {
  try {
    const singleService = await prisma.service.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.send(singleService)
  } catch (error) {
    next(error)
  }
})

//create new service
//TODO: connect freelancer_id to uid token
serviceRouter.post("/", async (req, res, next) => {
  const { name, tags, rate_time, freelancer_id } = req.body
  try {
    const newService = await prisma.service.create({
      data: {
        name,
        tags,
        rate: parseFloat(req.body.rate),
        rate_time,
        freelancer_id
      }
    })
    res.send(newService)
  } catch (error) {
    next(error)
  }
})

//update service
serviceRouter.patch("/:serviceid", async (req, res, next) => {
  const { name, tags, rate_time, freelancer_id } = req.body
  try {
    const newService = await prisma.service.update({
      where: {
        id: parseInt(req.params.serviceid)
      },
      data: {
        name,
        tags,
        rate: parseFloat(req.body.rate),
        rate_time,
        freelancer_id
      }
    })
    res.send(newService)
  } catch (error) {
    next(error)
  }
})

//delete service
serviceRouter.delete('/:serviceid', async (req, res, next) => {
  try{
    const deleteService = await prisma.service.delete({
      where: {
        id: parseInt(req.params.serviceid)
      }
    })
    res.send(deleteService)
  }catch(error){
    next(error)
  }
})

module.exports = serviceRouter
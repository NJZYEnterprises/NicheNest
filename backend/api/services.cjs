const express = require('express')
const serviceRouter = express.Router();
const { verifyToken } = require('../auth/middleware.cjs');


const prisma = require('../db/connection.cjs')
serviceRouter.use("/services", serviceRouter)

//get all services
serviceRouter.get("/", async (req, res, next) => {
  try {
    const allServices = await prisma.service.findMany();
    res.send(allServices)
  } catch (error) {
    next(error)
  }
})

//get service by uid
serviceRouter.get("/booked", verifyToken, async (req, res, next) => {
  const { uid } = req.user;
  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const bookedServices = await prisma.service.findMany({
      where: {
        freelancer_id: user.id,
      },
      include: {
        sessions: {
          include: {
            reservations: {
              include: {
                client: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).send(bookedServices);
  } catch (error) {
    next(error);
  }
});


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
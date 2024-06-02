const express = require('express')
const serviceRouter = express.Router();
const myPrisma = require('../db/myPrisma.cjs');
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
  const data = myPrisma.validate("Service", req.body);
  try {
    const newService = await prisma.service.create({ data })
    res.send(newService)
  } catch (error) {
    next(error)
  }
})

//update service
serviceRouter.patch("/:serviceid", async (req, res, next) => {
  const data = myPrisma.validate("Service", req.body);
  try {
    const newService = await prisma.service.update({
      where: {
        id: parseInt(req.params.serviceid)
      },
      data,
    })
    res.send(newService)
  } catch (error) {
    next(error)
  }
})

//delete service
serviceRouter.delete('/:serviceid', async (req, res, next) => {
  try {
    const service_id = parseInt(req.params.serviceid);

    // find all associated sessions
    const sessions = await prisma.session.findMany({
      where: { service_id },
      select: { id: true }
    });

    // delete sessions
    const deleteSession = async (session) => {
      const session_id = parseInt(session.id);
      // delete associated reservations
      await prisma.reservation.deleteMany({ where: { session_id } });
      // delete session
      await prisma.session.delete({ where: { id: session_id } });
    }
    await Promise.all(sessions.map(s => deleteSession(s)));

    // finally delete service after all relations are deleted
    const deletedService = await prisma.service.delete({
      where: { id: service_id }
    });
    res.send(deletedService);
  } catch (error) {
    next(error)
  }
})

module.exports = serviceRouter
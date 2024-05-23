const express = require('express')
const sessionRouter = express.Router();
const myPrisma = require('../db/myPrisma.cjs');
const prisma = require('../db/connection.cjs')
sessionRouter.use("/sessions", sessionRouter)

//get all the sessions
sessionRouter.get("/", async (req, res, next) => {
  try {
    const allSessions = await prisma.session.findMany();
    res.send(allSessions)
  } catch (error) {
    next(error)
  }
})

//get sessions by Id 
sessionRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const session = await prisma.session.findUnique({
      where: { id: Number(id) }, // Ensure the id is a number if it's stored as an integer in your database
    });

    if (session) {
      res.send(session);
    } else {
      res.status(404).send({ error: "Session not found" });
    }
  } catch (error) {
    next(error);
  }
});

//create by session id
sessionRouter.post('/', async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const sessionData = myPrisma.validate("Session", req.body);
    
    const newSession = await prisma.session.create({
      data: {
        ...sessionData,
        service: {
          connect: { id: parseInt(serviceId) }
        }
      }
    });

    res.send(newSession);
  } catch (error) {
    next(error);
  }
});


// Delete session by ID
sessionRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // Delete associated reservations first
    await prisma.reservation.deleteMany({
      where: { session_id: Number(id) },
    });

    // Then delete the session
    const deletedSession = await prisma.session.delete({
      where: { id: Number(id) },
    });

    res.send(deletedSession);
  } catch (error) {
    next(error);
  }
});

// Update session by ID
sessionRouter.patch('/:id', async (req, res, next) => {
  try {
    const data = myPrisma.validate("Session", req.body);
    const editSession = await prisma.session.update({ 
      where:{
        id: parseInt(req.params.id)
      }, 
      data });
    res.send(editSession)
  } catch (error) {
    next(error)
  }
})






module.exports = sessionRouter




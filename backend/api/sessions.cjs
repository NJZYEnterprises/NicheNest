const express = require('express')
const sessionRouter = express.Router();
const myPrisma = require('../db/myPrisma.cjs');
const prisma = require('../db/connection.cjs')
sessionRouter.use("/sessions", sessionRouter)
const { verifyToken } = require('../auth/middleware.cjs');


//get all the sessions
sessionRouter.get("/", async (req, res, next) => {
  try {
    const allSessions = await prisma.session.findMany();
    res.send(allSessions)
  } catch (error) {
    next(error)
  }
})

//get all sessions by service 
sessionRouter.get("/open/:service_id", async (req, res, next) => {
  const { service_id } = req.params;
  try {
    const serviceSessions = await prisma.session.findMany({
      where: {
        service_id: Number(service_id)
      },
      include: {
        reservations: true
      }
    });
    res.send(serviceSessions)
  } catch (error) {
    next(error)
  }
})

//get sessions by Id 
sessionRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const session = await prisma.session.findUnique({
      where: { id: Number(id) },
      includes: {
        reservations: true
      }
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
sessionRouter.post('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const sessionData = myPrisma.validate("Session", req.body);

    const newSession = await prisma.session.create({
      data: {
        ...sessionData,
        service: {
          connect: { id: parseInt(id) }
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
      where: {
        id: parseInt(req.params.id)
      },
      data
    });
    res.send(editSession)
  } catch (error) {
    next(error)
  }
})


// Delete session by ID
sessionRouter.delete("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
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

    await prisma.reservation.deleteMany({
      where: { session_id: Number(id) },
    });

    const deletedSession = await prisma.session.delete({
      where: { id: Number(id) },
    });

    res.send(deletedSession);
  } catch (error) {
    console.error("Error deleting session:", error);
    next(error);
  }
});

module.exports = sessionRouter;











const express = require('express')
const reservationRouter = express.Router();
const myPrisma = require('../db/myPrisma.cjs');
const prisma = require('../db/connection.cjs')

// Get reservation count by user ID
reservationRouter.get("/count/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const reservationCount = await prisma.reservation.count({
      where: {
        client_id: Number(userId),
      },
    });

    res.send({ count: reservationCount });
  } catch (error) {
    next(error);
  }
});

// Get reservations by user ID
reservationRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        client_id: Number(userId),
      },
      include: {
        session: {
          include: {
            service: true, // Include service details within the session
          },
        },
      },
    });

    if (reservations.length > 0) {
      res.send(reservations);
    } else {
      res.status(404).send({ error: "No reservations found for this user" });
    }
  } catch (error) {
    next(error);
  }
});

//Get reservation by uid
reservationRouter.get("/my-reservations/:uid", async (req, res, next) => {
  const { uid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const reservations = await prisma.reservation.findMany({
      where: {
        client_id: user.id,
      },
      include: {
        session: {
          include: {
            service: {
              include: {
                freelancer: true 
              }
            }
          }
        }
      },
    });
    if (reservations.length > 0) {
      res.send(reservations);
    } else {
      res.status(404).send({ error: "No reservations found for this user" });
    }
  } catch (error) {
    next(error);
  }
});



module.exports = reservationRouter
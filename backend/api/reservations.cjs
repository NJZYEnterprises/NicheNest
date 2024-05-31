const express = require('express')
const reservationRouter = express.Router();
const myPrisma = require('../db/myPrisma.cjs');
const prisma = require('../db/connection.cjs')
const { verifyToken } = require('../auth/middleware.cjs');
reservationRouter.use("/reservations", reservationRouter)

//get reservation by uid
reservationRouter.get("/my", verifyToken, async (req, res, next) => {
  const { uid } = req.user;
  console.log('uid', uid)

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
            service: true,
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

//Create Reservation
reservationRouter.post("/", async (req, res, next) => {
  const data = myPrisma.validate("Reservation", req.body);
  try {
    const newService = await prisma.reservation.create({ data })
    res.send(newService)
  } catch (error) {
    next(error)
  }
})


// delete reservation by uid auth
// reservationRouter.delete("/:reservationId", async (req, res, next) => {
//   const { reservationId } = req.params;
//   const header = req.headers.authorization;
//   const token = header.replace("Bearer ", "");

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         uid: token,
//       },
//     });

//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     // Check if the reservation with the given ID belongs to the user
//     const reservation = await prisma.reservation.findUnique({
//       where: {
//         id: parseInt(reservationId),
//         client_id: user.id,
//       },
//     });

//     if (!reservation) {
//       return res.status(404).send({ error: "Reservation not found or does not belong to the user" });
//     }

//     // If everything checks out, delete the reservation
//     const deletedReservation = await prisma.reservation.delete({
//       where: {
//         id: parseInt(reservationId),
//       },
//     });

//     res.send({ message: "Reservation deleted successfully", deletedReservation });
//   } catch (error) {
//     next(error);
//   }
// });

reservationRouter.delete('/:reservationId', verifyToken, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: req.user.uid,
      },
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const deleteReservation = await prisma.reservation.delete({
      where: {
        id: parseInt(req.params.reservationId),
        client_id: user.id
      }
    })
    res.send(deleteReservation)
  } catch (error) {
    next(error)
  }
})


module.exports = reservationRouter
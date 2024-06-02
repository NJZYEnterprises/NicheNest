const express = require('express');
const authRouter = express.Router();
const prisma = require("../db/connection.cjs");
const { verifyToken } = require("./middleware.cjs");

authRouter.get("/", (req, res, next)=>{
  res.send ( `This is the Auth Route`)
})

// Get the currently logged in user
authRouter.get("/me", verifyToken, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { uid: req.user?.uid },
      include: {
        location: true,
        links: true,
        images: true,
        reviews_received: true,
        reservations: {
          include: {
            session: {
              include: {
                service: {
                  include: {
                    freelancer: {
                      select: {
                        username: true,
                      }
                    }
                  }
                },
              }
            }
          }
        },
        services: {
          include: {
            availabilities: true,
            sessions: {
              include: {
                reservations: {
                  include: {
                    client: true
                  }
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(500).send('User not found.');
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter
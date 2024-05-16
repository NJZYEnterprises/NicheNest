const express = require("express")
const userRouter = express.Router()

const prisma = require("../db/connection.cjs")

userRouter.use("/users/", userRouter)

userRouter.get("/", (req, res, next) => {
  res.send(`this is the users route`)
})

userRouter.get("/freelancers/", async (req, res, next) => {
  try {
    const freelancers = await prisma.user.findMany({
      where: {
        services: { some: {} },
      },
      include: {
        images: true,
        reviews_received: true,
      },
    })
    res.send(freelancers)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter

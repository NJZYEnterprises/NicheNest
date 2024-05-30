const express = require("express")
const imageRouter = express.Router()
const prisma = require("../db/connection.cjs")
imageRouter.use("/images/", imageRouter)
const myPrisma = require('../db/myPrisma.cjs');
const { verifyToken } = require("../auth/middleware.cjs");

// get all images for a user
imageRouter.get("/", verifyToken, async (req, res, next) => {
  const { uid } = req.user;
  try {
    const images = await prisma.user_image.findMany({
      where: {
        user: { uid }
      }
    });
    res.json(images);
  } catch (error) {
    next(error);
  }
});

// Add image for a user
imageRouter.post("/add", verifyToken, async (req, res, next) => {
  const { uid } = req.user;
  try {
    const { image_url, description, isProfile } = req.body;

    const user = await prisma.user.findUnique({
      where: { uid }
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const newImage = await prisma.user_image.create({
      data: {
        image_url,
        description,
        isProfile,
        user: { connect: { id: user.id } }
      }
    });

    res.json(newImage);
  } catch (error) {
    next(error);
  }
});

// Route to update description
imageRouter.put("/:imageId", verifyToken, async (req, res, next) => {
  const { uid } = req.user;
  const { imageId } = req.params;
  const { description } = req.body;

  try {
      const user = await prisma.user.findUnique({
          where: { uid }
      });

      if (!user) {
          return res.status(404).send({ error: "User not found" });
      }
      const image = await prisma.user_image.findUnique({
          where: {
              id: parseInt(imageId),
          }
      });

      if (!image || image.user_id !== user.id) {
          return res.status(403).json({ error: "You are not authorized to edit this image" });
      }

      const updatedImage = await prisma.user_image.update({
          where: {
              id: parseInt(imageId),
          },
          data: {
              description: description,
          },
      });

      res.json(updatedImage);
  } catch (error) {
      next(error);
  }
});

// Route to delete an image
imageRouter.delete("/:imageId/delete", verifyToken, async (req, res, next) => {
  const { uid } = req.user;
  const { imageId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { uid }
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const image = await prisma.user_image.findUnique({
      where: {
        id: parseInt(imageId),
      }
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    if (image.user_id !== user.id) {
      return res.status(403).json({ error: "You are not authorized to delete this image" });
    }

    await prisma.user_image.delete({
      where: {
        id: parseInt(imageId),
      },
    });

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
});

//Route to set new  profile pic
imageRouter.post("/setProfilePicture", verifyToken, async (req, res, next) => {
  const { uid } = req.user;
  const { imageId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { uid },
      include: { images: true }
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const currentProfileImage = user.images.find(image => image.isProfile);

    if (currentProfileImage) {
      await prisma.user_image.update({
        where: { id: currentProfileImage.id },
        data: { isProfile: false }
      });
    }
    const updatedImage = await prisma.user_image.update({
      where: { id: parseInt(imageId) },
      data: { isProfile: true }
    });

    res.json(updatedImage);
  } catch (error) {
    next(error);
  }
});

module.exports = imageRouter
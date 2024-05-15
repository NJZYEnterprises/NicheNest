const express = require('express');
const prisma = require('../db/connection.cjs');
const reviewsRouter = express.Router();

// Middleware to verify client
function verifyClient(req, res, next) {
  next();
}

// Middleware to verify completed session
function verifyCompletedSession(req, res, next) {
  next();
}

// Creates review
reviewsRouter.post("/", verifyCompletedSession, async (req, res) => {
  const { freelancerId, clientId, star_review, comment } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { freelancer_id: freelancerId, client_id: clientId, star_review, comment }
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Gets all reviews from our clients
reviewsRouter.get("/", async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.json(reviews);
});

// Updates review
reviewsRouter.put("/:id", verifyClient, async (req, res) => {
  const { id } = req.params;
  const { star_review, comment } = req.body;
  try {
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { star_review, comment }
    });
    res.json(updatedReview);
  } catch (error) {
    res.status(404).json({ error: "Review not found" });
  }
});

// Deletes review
reviewsRouter.delete("/:id", verifyClient, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = reviewsRouter;

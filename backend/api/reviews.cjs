const express = require('express');
const prisma = require('../db/connection.cjs');
const reviewsRouter = express.Router();

//Create a review
reviewsRouter.post("/", async (req, res) => {
  const { freelancerId, clientId, star_review } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { freelancer_id: freelancerId, client_id: clientId, star_review }
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get Reviews by FreelancerId
reviewsRouter.get("/review/:id", async (req, res) => {

  const { id } = req.params;
  console.log(`CLIENT ID`, id);
  try{
    const freelancerReviews = await prisma.review.findMany({
      where:{
        freelancer_id: Number(id)
      },
    });
    res.send(freelancerReviews)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});


//Get all reviews
reviewsRouter.get("/", async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.json(reviews);
});



  


// Updates reviews
reviewsRouter.put("/:id", async (req, res) => {
  
  const { star_review } = req.body;
  try {
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { star_review }
    });
    res.json(updatedReview);
  } catch (error) {
    res.status(404).json({ error: "Review not found" });
  }
});

// Deletes reviews
reviewsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = reviewsRouter;


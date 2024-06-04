import MyButton from './buttons/MyButton';
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserProvider';
import Fetcher from "../fetcher";

const RateFreelancer = ({ freelancerId, fetchFreelancer }) => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState()
  const { user } = useContext(UserContext);
  const fetcher = new Fetcher("api");

  useEffect(() => {
    fetchReviews();
  }, [freelancerId])

  useEffect(() => {
  }, [reviews])

  const fetchReviews = async() => {
    fetcher.route(`/reviews/review/${freelancerId}`).get(setReviews); 
  }

  const myReview = reviews.find((review)=>{return review.client_id===user?.id})
  if(myReview){
    return null
  }

  const handleRating = async (rating) => {
    const reviewData = {
      freelancerId,
      clientId: user?.id,
      star_review: rating
    }
    await fetcher.route('/reviews').post(reviewData)
    fetchReviews();
    if( fetchFreelancer instanceof Function ){
      fetchFreelancer();
    }
    
  }

  const rates = [1, 2, 3, 4, 5]

  return (
    <div className="card p-1 m-1" style={{ backgroundColor: "var(--littleBoyBlue)" }} >
      {rates.map((selectedRate) => {
        return (
          <MyButton text={`${selectedRate}⭐`} onClick={() => { handleRating(selectedRate) }}
            cssType={"submit"} cssSpacing={''} value={selectedRate} />
        )
      })}
    </div>

  )
}

export default RateFreelancer


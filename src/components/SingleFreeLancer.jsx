import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fetcher from "../fetcher";
import { calculateAverageRating } from "../../utils/profileUtils";
import ServiceCard from "./ServiceCard"

const SingleFreeLancer = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [rateToggle, setRateToggle] = useState(false);

  useEffect(() => {
    const fetcher = new Fetcher("api");
    const setModifiedFreelancer = (f) => {
      calculateAverageRating(f);
      setFreelancer(f);
    }
    fetcher.route(["users/freelancers", id]).get(setModifiedFreelancer);
  }, [id]);

  const handleRating = () => {
    setRateToggle(!rateToggle)
    console.log(`RATE TGL`, rateToggle)
  }

  if (!freelancer) return <div> Loading...</div>;
  calculateAverageRating(freelancer);

  const profilePic = freelancer.images?.find(e => e.isProfile) ?? freelancer.images?.at(0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto p-4">
        <div className="surface-color card p-6">
          <h2 className="text-2xl font-bold mb-4">{freelancer.firstName} {freelancer.lastName}</h2>
          <div className="flex justify-center">
            <div className="flex flex-col">
              {profilePic && <img src={profilePic.image_url} alt="Profile" className="w-32 h-32 rounded-md" />}
              <div className="mt-4">
                <p>
                  <span aria-label="a rocket blasting off" role="img">
                    <button onClick={handleRating}>
                      ⭐
                    </button>
                  </span>
                  {`${freelancer.averageRating} (${freelancer.reviews_received.length} ratings)`}
                </p>
                <div>
                      <button >1⭐</button>
                      <button >2⭐</button>
                      <button >3⭐</button>
                      <button >4⭐</button>
                      <button >5⭐</button>  
                    </div>
                <p className="mt-2">{freelancer.bio}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Services</h4>
            {freelancer.services && freelancer.services.map(service => (
              <ServiceCard key={service.id} {...{ service, freelancer }} />)
            )}
          </div>
          <div className="mt-4">
            {/* TODO: decide whether book now button is applicable for freelancer in general */}
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">Book Now</button> */}
            <button className="view-button text-white px-4 py-2 rounded ml-2">Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFreeLancer;


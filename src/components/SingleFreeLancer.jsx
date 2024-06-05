import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Fetcher from "../fetcher";
import { calculateAverageRating } from "../../utils/profileUtils";
import ServiceCard from "./ServiceCard";
import UserContact from "../pages/UserContact";
import ToggleButton from "./buttons/ToggleButton";
import Calendar from "./Calendar";
import RateFreelancer from "./FreelancerRating";

const SingleFreeLancer = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const toggleCalendar = useState(false);

  useEffect(() => {
    fetchFreelancer();
  }, [id]);

  const fetchFreelancer = () => {
    const fetcher = new Fetcher("api");
    const setModifiedFreelancer = (f) => {
      calculateAverageRating(f);
      setFreelancer(f);
    }
    fetcher.route(["users/freelancers", id]).get(setModifiedFreelancer);
  }

  if (!freelancer) return <div> Loading...</div>;
  calculateAverageRating(freelancer);

  const profilePic = freelancer.images?.find(e => e.isProfile) ?? freelancer.images?.at(0);

  return (
    <div className="flex flex-col min-h-screen textShadow">
      <div className="flex-grow container mx-auto p-4">
        <div className="surface-color card p-6 flex flex-col items-center">
          <div className="birds-nest card py-2 m-2" style={{ aspectRatio: 1 / 1 }}>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">{freelancer.firstName} {freelancer.lastName}</h2>
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                {profilePic && <img src={profilePic.image_url} alt="Profile" className="w-64 h-64 rounded-md" />}
                <div className="mt-4 text-yellow-500">
                  <p>
                    <span aria-label="a rocket blasting off" role="img">
                      ⭐
                    </span>
                    {freelancer.averageRating}
                    <span className="mt-4 text-black">{` (${freelancer.reviews_received.length} ratings)`}</span>
                  </p>
                  <RateFreelancer freelancerId={freelancer.id} fetchFreelancer={fetchFreelancer} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="primary-color-t card px-6 py-3 my-4" style={{minWidth: "40%", maxWidth: "80%"}}> */}
          <div className="surface-text card my-4" style={{ minWidth: "40%", maxWidth: "80%" }}>
            <h2 className="text-2xl font-bold primary-color-t rounded-t-xl">Bio</h2>
            <p className="px-2 py-1">{freelancer.bio}</p>
          </div>
          {/* </div> */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold home-title-text searchbar-text-color border-black border-t-2 border-b-2 py-2">
              Services
            </h4>
            <div className="flex flex-row flex-wrap justify-center">
              {freelancer.services && freelancer.services.map(service => (
                <ServiceCard key={service.id} {...{ service, freelancer }} />)
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <ToggleButton text={["Show Calendar", "Hide Calendar"]} state={toggleCalendar} />
          </div>
        </div>
        {toggleCalendar[0] && <div className="flex justify-center">
          <Calendar user={freelancer} />
        </div>}
      </div>
    </div>
  );
};

export default SingleFreeLancer;

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

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

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
                    ⭐
                  </span>
                  {`${freelancer.averageRating} (${freelancer.reviews_received.length} ratings)`}
                </p>
                <RateFreelancer freelancerId={freelancer.id} fetchFreelancer ={fetchFreelancer} />
                <div>
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
          <div className="mt-4 flex justify-center">
            <ToggleButton text={["Show Calendar", "Hide Calendar"]} state={toggleCalendar} />
            <button
              onClick={handleContactClick}
              className="view-button text-white px-4 py-2 rounded ml-2"
            >
              Contact
            </button>
          </div>
        </div>
        {toggleCalendar[0] && <div className="flex justify-center">
          <Calendar user={freelancer} />
        </div>}
      </div>
      {showContactForm && (
        <UserContact
          freelancer={freelancer}
          onClose={handleCloseContactForm}
        />
      )}
    </div>
  );
};

export default SingleFreeLancer;

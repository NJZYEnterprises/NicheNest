import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Fetcher from "../fetcher";

const SingleFreeLancer = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    const fetcher = new Fetcher("api");
    fetcher.route(["users/freelancers", id]).get(setFreelancer);
  }, [id]);

  if (!freelancer) return <div> Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto p-4">
        <div className="bg-slate-800 shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Instructor</h2>
          <div className="flex">
            <img src={freelancer.image_url} alt="Profile" className="w-32 h-32 rounded-full" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{freelancer.firstName} {freelancer.lastName}</h3>
              <p>{freelancer.bio}</p>
              <p>Rating: {freelancer.rating}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Services</h4>
            {freelancer.services && freelancer.services.map(service => (
              <div key={service.id} className="mt-2">
                <p>Name: {service.name}</p>
                <p>Rate: ${service.rate} per {service.rate_time}</p>
                <p>Weekly Availability: {service.availability}</p>
                <p>Default Location: {freelancer.location.city}, {freelancer.location.state}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Book Now</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFreeLancer;


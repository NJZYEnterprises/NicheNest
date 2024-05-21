import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import Fetcher from "../fetcher.js";
import MyBookedServices from "./MyBookedServices"

const MySessionsCard = () => {
  const [userReservations, setUserReservations] = useState();
  const [userServices, setUserServices] = useState();
  const [freelancers, setFreelancers] = useState([])
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [moreDetails, setMoreDetails] = useState([]);
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const reservationData = await fetcher.setToken(userId.accessToken).route(`reservations/my`).get();
        const servicesData = await fetcher.setToken(userId.accessToken).route(`services/booked`).get();
        const flattenedReservations = reservationData.map(reservation => ({
          when_created: reservation.when_created,
          reservationId: reservation.id,
          session_description: reservation.session.description,
          session_when_start: reservation.session.when_start,
          session_duration_min: reservation.session.duration_min,
          session_status: reservation.session.status,
          session_capacity: reservation.session.capacity,
          service_name: reservation.session.service.name,
          service_tags: reservation.session.service.tags,
          service_rate: reservation.session.service.rate,
          service_rate_time: reservation.session.service.rate_time,
          service_freelancer_name: reservation.session.service.freelancer.username
        }));
       
        setUserReservations(flattenedReservations);
        setUserServices(servicesData);


      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, [userId]);



  const toggleExpand = (id) => {
    setMoreDetails(prevMoreDetails => 
      prevMoreDetails.includes(id) 
        ? prevMoreDetails.filter(detailId => detailId !== id) 
        : [...prevMoreDetails, id]
    );
  };
  
  const handleDelete = async (reservationId) => {
    try {
      const uid = userId.uid;
      console.log('uid',uid)

      await fetcher
      .route(`/reservations/${reservationId}`)
      .setToken(uid)
      .delete();

      setUserReservations(prevReservations => 
        prevReservations.filter(reservation => reservation.reservationId !== reservationId)
      );
      
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
  <div className="p-5 bg-gray-800 rounded-md m-5">
    {/* <div>
      <h1 className='text-3xl font-bold'>My Booked Sessions</h1>
    </div> */}
    <div className="flex p-10 m-5 rounded-md">
    {userReservations && userReservations.map((reservation, index) => (
        <div key={reservation.reservationId} className="bg-gray-700 flex flex-col rounded-md p-4 m-10">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-2">
              <h2 className="text-lg font-bold text-white">Service Name:</h2>
              <span className="text-lg font-bold text-orange-500">{reservation.service_name}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <p className="text-white">Session Start:</p>
              <span className="text-lg font-bold text-orange-500">{new Date(reservation.session_when_start).toLocaleString()}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <p className="text-white">Session Duration:</p>
              <span className="text-lg font-bold text-orange-500">{reservation.session_duration_min} minutes</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <p className="text-white">Session Instructor:</p>
              <span className="text-lg font-bold text-orange-500">{reservation.service_freelancer_name}</span>
            </div>
            {moreDetails.includes(reservation.reservationId) && (
              <>
                <div className="flex flex-row justify-between mb-2">
                  <p className="text-white">Session Status:</p>
                  <span className="text-lg font-bold text-orange-500">{reservation.session_status}</span>
                </div>
                <div className="flex flex-row justify-between mb-2">
                  <p className="text-white">Session Capacity:</p>
                  <span className="text-lg font-bold text-orange-500">{reservation.session_capacity}</span>
                </div>
                <div className="flex flex-row justify-between mb-2">
                  <p className="text-white">Service Rate:</p>
                  <span className="text-lg font-bold text-orange-500">${reservation.service_rate} per {reservation.service_rate_time}</span>
                </div>
                <div className="flex flex-row justify-between mb-2">
                  <p className="text-white">Session Description:</p>
                  <span className="text-lg font-bold text-orange-500">{reservation.session_description}</span>
                </div>
                <div className="flex flex-row justify-between mb-2">
                  <p className="text-white">Created At:</p>
                  <span className="text-lg font-bold text-orange-500">{new Date(reservation.when_created).toLocaleString()}</span>
                </div>
              </>
            )}
            <div className="flex justify-center gap-2">
              <button
                className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => toggleExpand(reservation.reservationId)}
              >
                {moreDetails.includes(reservation.reservationId) ? 'Show Less' : 'Show More'}
              </button>
              <button
                className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDelete(reservation.reservationId)}
              >
                Cancel RSVP
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div>
      <MyBookedServices userServices={userServices} />
    </div>
  </div>
  );
};

export default MySessionsCard;


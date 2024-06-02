import MyReservations from './MyReservations';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import Fetcher from "../fetcher.js";
import MyServices from "./MyServices.jsx"

const MySessionsCard = () => {
  const [userReservations, setUserReservations] = useState();
  const [userServices, setUserServices] = useState();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [moreDetails, setMoreDetails] = useState([]);
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");

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

  useEffect(() => {
   
    fetchReservations();
  }, [userId]);


  const toggleExpand = (id) => {
    setMoreDetails(prevMoreDetails => 
      prevMoreDetails.includes(id) 
        ? prevMoreDetails.filter(detailId => detailId !== id) 
        : [...prevMoreDetails, id]
    );
  };



  const handleDelete = async (reservationId, sessionId) => {
    try {
      await fetcher
        .route(`/reservations/${reservationId}`)
        .setToken(userId.accessToken)
        .delete();
        fetchReservations();

    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="p-5 rounded-md m-5 flex flex-col">
      <div className="">
      <MyReservations
          userReservations={userReservations}
          setUserReservations={setUserReservations}
          moreDetails={moreDetails}
          toggleExpand={toggleExpand}
          handleDelete={handleDelete}
        />
      </div>
      <div>
        <MyServices 
          userServices={userServices}
          setUserReservations={setUserReservations}
         />
      </div>
    </div>
  );
};

export default MySessionsCard;


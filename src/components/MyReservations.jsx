import React, { useContext, } from "react";
import { UserContext } from './UserProvider.jsx';
import ReservationCard from "./ReservationCard.jsx";

function MyReservations(props) {
  const { user } = useContext(UserContext);

  const userReservations = user?.reservations ?? [];

  return <div className="flex flex-col p-8 m-8 surface-color card">
    <div className="flex flex-col mb-4">
      <h1 className='text-3xl font-bold'>My Reservations</h1>
    </div>
    <div className="flex flex-row justify-around flex-wrap m-5">
      {userReservations.map((reservation, i) => (
        <ReservationCard key={i} reservation={reservation} />
      ))}
    </div>
  </div>;
}

export default MyReservations;

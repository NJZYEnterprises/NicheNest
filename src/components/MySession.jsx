import React, { useState, useContext, } from 'react';
import { UserContext } from './UserProvider.jsx';
import ToggleButton from './buttons/ToggleButton.jsx';
import DeleteButton from './buttons/DeleteButton.jsx';
import { Detail } from './ReservationCard.jsx';

function MySession({ session }) {
  const { updateUser } = useContext(UserContext);

  const showMoreState = useState(false);
  const showMore = showMoreState[0];

  const reservations = session?.reservations ?? [];

  const participant = (reservation) => {
    return reservation?.client
      ? `${reservation.client.firstName} ${reservation.client.lastName}`
      : "<unknown>"
  }
  const Participant = ({ reservation }) => {
    return <span className="text-lg font-bold text-orange-500">
      {participant(reservation)}
    </span>
  }
  const participantsStr = reservations.length > 0 ?
    reservations.map(r => participant(r)).join(', ') : "none";

  const details = [
    { label: "Description", content: session?.description, hideEmpty: true },
    { label: "Start", content: new Date(session?.when_start).toLocaleString() },
    { label: "Duration", content: `${session?.duration_min} minutes` },
    { label: "Status", content: session?.status },
    { label: "Capacity", content: `${reservations.length} / ${session?.capacity}` },
    { label: "Participants", content: participantsStr },
  ];

  return <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <div>
        <p className="text-white">Session ID:</p>
        <span className="text-lg font-bold text-orange-500">{session.id}</span>
      </div>
      <div className="flex gap-2">
        <ToggleButton state={showMoreState} text={['Show Session Info', 'Hide Session Info']} />
        <DeleteButton subRoutes={["sessions", session?.id]} updateFn={updateUser} />
      </div>
    </div>
    {showMore && (
      <div>
        <div className="surface-text p-3 m-6">{details.map(d => <Detail {...d} />)}</div>
        {/* {reservations.length === 0
          ? <div className="text-white">No reservations</div>
          : reservations.map((reservation, i) => (
            <div key={i} className="mb-2">
              <h1>Participants</h1>
              <Participant reservation={reservation} />
            </div>
          ))
        } */}
      </div>
    )}
  </div>
}

export default MySession;
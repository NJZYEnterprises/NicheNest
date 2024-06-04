import React, { useState, useContext, } from 'react';
import { UserContext } from './UserProvider.jsx';
import ToggleButton from './buttons/ToggleButton.jsx';
import DeleteButton from './buttons/DeleteButton.jsx';
import { Detail } from './ReservationCard.jsx';
import myDate from '../utils/myDate.cjs';

const participant = (reservation) => {
  return reservation?.client
    ? `${reservation.client.firstName} ${reservation.client.lastName}`
    : "<unknown>"
}
export function getSessionDetails(session) {
  const reservations = session?.reservations ?? [];

  const participantsStr = reservations.length > 0 ?
    reservations.map(r => participant(r)).join(', ') : "none";

  return [
    { label: "Description", content: session?.description, hideEmpty: true },
    { label: "Date", content: myDate.dateRangeDur(session?.when_start, session?.duration_min) },
    { label: "Time", content: myDate.timeframeDur(session?.when_start, session?.duration_min) },
    { label: "Status", content: session?.status },
    { label: "Capacity", content: `${reservations.length} / ${session?.capacity}` },
    { label: "Participants", content: participantsStr },
  ];
}

function MySession({ session }) {
  const { updateUser } = useContext(UserContext);

  const showMoreState = useState(false);
  const showMore = showMoreState[0];

  const details = getSessionDetails(session);

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
      </div>
    )}
  </div>
}

export default MySession;
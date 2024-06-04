import { useState, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider";
import { UserContext } from './UserProvider.jsx';
import myString from "../utils/myString.cjs";
import ToggleButton from "./buttons/ToggleButton.jsx";
import DeleteButton from "./buttons/DeleteButton.jsx";
import myDate from "../utils/myDate.cjs";
import moment from "moment";

// Helper Component
export function Detail({ label, content, tag, hideEmpty }) {
  if (hideEmpty && !myString.validate(content)) return null;
  if (!myString.validate(tag)) tag = "p";

  let labelClass = "text-white text-left textShadow";
  if (tag.startsWith('h')) labelClass = [labelClass, "text-lg", "font-bold"].join(' ');

  return <div className="flex flex-row flex-wrap gap-x-2 my-1 items-center">
    <tag className={labelClass} style={{ minWidth: "10rem" }}>{label}:</tag>
    <div className="text-lg font-bold text-orange-500 text-left textShadow max-w-full" style={{overflowWrap: 'break-word'}}>{content}</div>
  </div>
}

export function getReservationDetails(reservation, showMore) {
  const session = reservation?.session;
  const service = session?.service;
  const details = [
    { label: "Service Name", content: service?.name, tag: "h2" },
    { label: "Session Host", content: service?.freelancer?.username },
    { label: "Session Date", content: myDate.dateRangeDur(session?.when_start, session?.duration_min) },
    { label: "Session Time", content: myDate.timeframeDur(session?.when_start, session?.duration_min) },
  ];

  if (showMore) details.push(...[
    { label: "Session Status", content: session?.status },
    { label: "Session Capacity", content: session?.capacity },
    { label: "Service Rate", content: `$${service?.rate} per ${service?.rate_time}` },
    { label: "Created At", content: new Date(reservation?.when_created).toLocaleString() },
    { label: "Session Description", content: session?.description },
  ]);

  return details;
}

// Main Component
function ReservationCard({ reservation }) {
  const { userId } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);
  const showMoreState = useState(false);
  const showMore = showMoreState[0];

  const details = getReservationDetails(reservation, showMore);

  return <div className="primary-color-t card flex flex-col mx-4 my-6 p-6" style={{ alignSelf: "flex-start" }}>
    <div className="flex flex-col justify-around gap-6">
      <div className="surface-text p-3" style={{ minWidth: "25em", maxWidth: "25em" }}>{details.map(d => <Detail {...d} />)}</div>
      <div className="flex justify-center gap-2">
        <ToggleButton state={showMoreState} text={['Show More', 'Show Less']} />
        <DeleteButton text="Cancel RSVP" subRoutes={["reservations", reservation?.id]} updateFn={updateUser} />
      </div>
    </div>
  </div>
}

export default ReservationCard;
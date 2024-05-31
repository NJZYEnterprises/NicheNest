import { useState, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider";
import { UserContext } from './UserProvider.jsx';
import Fetcher from "../fetcher.js";
import myString from "../utils/myString.cjs";

const fetcher = new Fetcher("api");

function Detail({ label, content, tag }) {
  if (!myString.validate(tag))
    tag = "p";

  let labelClass = "text-white min-w-max text-left";
  if (tag.startsWith('h')) labelClass = [labelClass, "text-lg", "font-bold"].join(' ');

  return <div className="flex flex-row gap-5 mb-2">
    <tag className={labelClass} style={{width: "9rem"}}>{label}:</tag>
    <div className="text-lg font-bold text-orange-500">{content}</div>
  </div>
}

function ReservationCard({ reservation }) {
  const { userId } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const toggleExpand = () => {
    setShowMoreDetails(prev => !prev);
  }

  const handleDelete = async (reservationId) => {
    await fetcher
      .route(["reservations", reservationId])
      .setToken(userId.accessToken)
      .delete();
    updateUser();
  };

  const session = reservation?.session;
  const service = session?.service;
  const details = [
    { label: "Service Name", content: service?.name, tag: "h2" },
    { label: "Session Start", content: new Date(session?.when_start).toLocaleString() },
    { label: "Session Duration", content: `${session?.duration_min} minutes` },
    { label: "Session Host", content: service?.freelancer?.username },
  ];

  if (showMoreDetails) details.push(...[
    { label: "Session Status", content: session?.status },
    { label: "Session Capacity", content: session?.capacity },
    { label: "Service Rate", content: `$${service?.rate} per ${service?.rate_time}` },
    { label: "Session Description", content: session?.description },
    { label: "Created At", content: new Date(reservation?.when_created).toLocaleString() },
  ]);

  return <div className="primary-color-t card flex flex-col mx-4 my-6 p-6" style={{alignSelf: "flex-start"}}>
    <div className="flex flex-col justify-around gap-6">
      <div className="surface-text p-3">{details.map(d => <Detail {...d} />)}</div>
      <div className="flex justify-center gap-2">
        <button className="view-button text-white font-bold py-1 px-2 rounded" onClick={() => toggleExpand(reservation?.id)}>
          {showMoreDetails ? 'Show Less' : 'Show More'}
        </button>
        <button className="error-button text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(reservation?.id)}>
          Cancel RSVP
        </button>
      </div>
    </div>
  </div>
}

export default ReservationCard;
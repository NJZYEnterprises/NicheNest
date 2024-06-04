import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookButton from "./buttons/BookButton";
import Fetcher from "../fetcher";

const fetcher = new Fetcher("api");

const SessionCard = () => {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);

  const fetchAll = () => {
    fetcher.route(["sessions/open/", id]).get(setSessions);
  }

  useEffect(() => {
    fetchAll();
  }, [id,]);

  const reserveSession = async (sessionId) => {
    const reservationData = {
      session_id: sessionId,
      client_id: user?.id,
      status: "joined"
    }
    await fetcher.setToken(userId.accessToken).route("reservations").post(reservationData);
    fetachAll();
  }

  const alreadyBooked = (checkId) => {
    const sessionIds = reservations.map(ids => ids.session_id);
    if (sessionIds.includes(checkId)) {
      return (
        <div className="text-lg font-bold text-orange-500">
          ALREADY RESERVED SESSION!!
        </div>
      );
    };
  };

  //capacity check function
  const fullSession = (sessionInfo) => {
    if (sessionInfo.capacity <= sessionInfo.reservations.length) {
      return (
        <div className="text-lg font-bold text-orange-500">
          SESSION FULL! Check out my other sessions!
        </div>
      )
    };
  };



  return (
    <>
      <div>
        {sessions.map((session) => {
          const date = session.when_start
          return (
            <>
              <div className="flex flex-col p-10 m-5 surface-color card">
                <h2 className="text-lg font-bold" key={session.id}>{session.description}</h2>
                <h2>Date:</h2>
                <p>{date.substring(0, 10)}</p>
                <h2>Time:</h2>
                <p>{date.substring(11, 19)}</p>
                <h2>Total Allowed Participants:</h2>
                <p>{session.reservations?.length}/{session.capacity}</p>
                <div>{
                  alreadyBooked(session.id) ??
                  fullSession(session) ??
                  <button className="view-button text-white font-bold py-2 px-2 rounded"
                    onClick={() => reserveSession(session.id)}>
                    Book Now!
                  </button>
                }</div>
              </div>
            </>
          )
        })};
      </div>
    </>
  )
}

export default SessionCard
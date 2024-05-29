import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fetcher from "../fetcher";



const SessionCard = () => {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetcher = new Fetcher("api");
    fetcher.route(["sessions/open/", id]).get(setSessions);
  }, [id]);

  console.log(`AVAIL SESH`, sessions)

  return (
    <>
      <div>
        {sessions.map((sessions) => {
          const date = sessions.when_start
          return (
            <div className="flex flex-col p-10 m-5 surface-color card">
              <h2 className="text-lg font-bold" key={sessions.id}>{sessions.description}</h2>
              <h2>Date:</h2>
              <p>{date.substring(0,10)}</p>
              <h2>Time:</h2>
              <p>{date.substring(11,19)}</p>
              <p>{date.substring(0,10)}</p>
              <h2>Capacity:</h2>
              <p>{sessions.capacity}</p>
              <button className="view-button text-white font-bold py-2 px-2 rounded">
              Book Now!
              </button>
            </div>

          )
        })}
      </div>

    </>
  )

}

export default SessionCard
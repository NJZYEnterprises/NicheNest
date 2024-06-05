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

  return (
    <>
      <div>
        {sessions.map((session) => {
          const date = session.when_start
          return (
            <>
              <div className="flex flex-col p-10 m-5 surface-color card textShadow">
                <h2 className="text-lg font-bold" key={session.id}>{session.description}</h2>
                <h2>Date:</h2>
                <p>{date.substring(0, 10)}</p>
                <h2>Time:</h2>
                <p>{date.substring(11, 19)}</p>
                <h2>Total Allowed Participants:</h2>
                <p>{session.reservations?.length}/{session.capacity}</p>
                <div>
                  <BookButton session={session} updateFn={fetchAll} />
                </div>
              </div>
            </>
          )
        })};
      </div>
    </>
  )
}

export default SessionCard
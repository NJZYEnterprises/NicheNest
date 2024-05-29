import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fetcher from "../fetcher";



const SessionCard = () => {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetcher = new Fetcher("api");
    fetcher.route(["sessions/available/", id]).get(setSessions);
  }, [id]);

  console.log(`AVAIL SESH`, sessions)

  return (
    <>
    <div>
    {sessions.map((sessions)=>{
      return (
        <h2 key ={sessions.id}>{sessions.description}</h2>
      )
    })}
    </div>

    </>
  )

}

export default SessionCard
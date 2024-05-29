import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import { UserContext } from "../components/UserProvider";



const SessionCard = () =>{ 
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");

  useEffect(() => {
    fetcher.route(["sessions/open/", id]).get(setSessions);
  }, [id]);



  const reserveSession = (sessionId) => {
    console.log(`SESH` , sessionId)
    const reservationData = {
      session_id: sessionId,
      client_id: user?.id,
      status: "joined"
    }
    fetcher.setToken(userId.accessToken).route("reservations").post(reservationData);
  }


return (
  <>
    <div>
      {sessions.map((sessions) => {
        const date = sessions.when_start
        {console.log(`SESHID`, sessions.id)}
        return (
          <div className="flex flex-col p-10 m-5 surface-color card">
            <h2 className="text-lg font-bold" key={sessions.id}>{sessions.description}</h2>
            <h2>Date:</h2>
            <p>{date.substring(0, 10)}</p>
            <h2>Time:</h2>
            <p>{date.substring(11, 19)}</p>
            <h2>Capacity:</h2>
            <p>{sessions.capacity}</p>
            <div>
              <button className="view-button text-white font-bold py-2 px-2 rounded"
                onClick={reserveSession(sessions.id)}>
                Book Now!
              </button>
            </div>
          </div>

        )
      })}
    </div>

  </>
)

}

export default SessionCard
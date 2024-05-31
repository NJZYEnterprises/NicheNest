import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import { UserContext } from "../components/UserProvider";
import AlreadyBooked from "./AlreadyBooked";




const SessionCard = () => {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");



  console.log(`USER`, user);
  console.log(`session`, sessions);
  console.log(`sessionID!!`, sessions.id);
  console.log(` RESERVATIONS`, reservations);
  console.log(`SINGLE REZ`, reservations[0]);


 const fetchResservations=()=>{

  fetcher.route(`reservations/${user.id}`).get(setReservations);

 }




  useEffect(() => {
    fetcher.route(["sessions/open/", id]).get(setSessions);
    fetchResservations();
   
  }, [id,]);




  const reserveSession = async (sessionId) => {
    console.log(`SESH`, sessionId)
    const reservationData = {
      session_id: sessionId,
      client_id: user?.id,
      status: "joined"
    }
   await fetcher.setToken(userId.accessToken).route("reservations").post(reservationData);
    fetchResservations();

  }


  const alreadyBooked = (checkId) => {
    console.log(`CHECKID`, checkId)
    const sessionIds = reservations.map(ids=>ids.session_id);
    return sessionIds.includes(checkId)
  }






  return (
    <>
      <div>
        {sessions.map((session) => {
          const date = session.when_start
          { console.log(`SESHID`, session.id) }

          return (
            <>
              {!alreadyBooked(session.id) ?
                <div className="flex flex-col p-10 m-5 surface-color card">
                  <h2 className="text-lg font-bold" key={session.id}>{session.description}</h2>
                  <h2>Date:</h2>
                  <p>{date.substring(0, 10)}</p>
                  <h2>Time:</h2>
                  <p>{date.substring(11, 19)}</p>
                  <h2>Capacity:</h2>
                  <p>{session.capacity}</p>
                  <div>
                    <button className="view-button text-white font-bold py-2 px-2 rounded"
                      onClick={() => reserveSession(session.id)}>
                      Book Now!
                    </button>
                  </div>
                </div> :
                <AlreadyBooked />}
            </>
          )
        })}
      </div>

    </>
  )

}

export default SessionCard
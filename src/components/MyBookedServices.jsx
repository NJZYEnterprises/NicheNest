import React, { useState, useContext } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import Fetcher from "../fetcher.js";


const MyBookedServices = ({ userServices, setUserServices }) => {
  const [serviceIsOpen, setServiceIsOpen] = useState({});
  const [sessionIsOpen, setSessionIsOpen] = useState({});
  const { userId } = useContext(AuthContext)
  const fetcher = new Fetcher("api");

  const toggleService = (serviceId) => {
    setServiceIsOpen((prevServiceIsOpen) => ({
      ...prevServiceIsOpen,
      [serviceId]: !prevServiceIsOpen[serviceId],
    }));
  };

  const handleDelete = async (sessionId) => {
    try {
      await fetcher
        .route(`/sessions/${sessionId}`)
        .setToken(userId.accessToken)
        .delete();
  
      // setUserServices(prevServices =>
      //   prevServices.filter(service => service.id !== sessionId)
      // );
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };
  

  return (
    <div className="flex flex-col bg-slate-950 p-10 m-5 rounded-md h-screen max-h-screen overflow-y-auto">
    <div className="mb-4">
      <h1 className="text-3xl font-bold">My Booked Services</h1>
    </div>
    <div className="m-10">
      {userServices && userServices.map((service) => (
        <div key={service.id} className="bg-gray-700 rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-orange-500">{service.name}</span>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => toggleService(service.id)}
            >
              {serviceIsOpen[service.id] ? 'Hide Sessions' : 'Show Sessions'}
            </button>
          </div>
          {serviceIsOpen[service.id] && (
            <div className="overflow-y-auto max-h-96"> {/* Set a fixed max height for the sessions container */}
              {service.sessions.length === 0 ? (
                <div className="text-white">No sessions</div>
              ) : (
                service.sessions.map((session) => (
                  <div key={session.id} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-white">Session ID:</p>
                        <span className="text-lg font-bold text-orange-500">{session.id}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => toggleSession(session.id)}
                        >
                          {sessionIsOpen[session.id] ? 'Hide Session Info' : 'Show Session Info'}
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDelete(session.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {sessionIsOpen[session.id] && (
                      <div>
                        {session.reservations.map((reservation) => (
                          <div key={reservation.client.id} className="mb-2">
                            <span className="text-lg font-bold text-orange-500">
                              {reservation.client.firstName} {reservation.client.lastName}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
};

export default MyBookedServices;

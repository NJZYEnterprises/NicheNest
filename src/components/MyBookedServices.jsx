import React, { useState } from 'react'

const MyBookedServices = ({userServices}) => {
  const [serviceIsOpen, setServiceIsOpen] = useState({});
const [sessionIsOpen, setSessionIsOpen] = useState({});
console.log("bookComp", userServices )

const toggleService = (serviceId) => {
  setServiceIsOpen((prevServiceIsOpen) => ({ ...prevServiceIsOpen, [serviceId]: !prevServiceIsOpen[serviceId] }));
};

const toggleSession = (sessionId) => {
  setSessionIsOpen((prevSessionIsOpen) => ({ ...prevSessionIsOpen, [sessionId]: !prevSessionIsOpen[sessionId] }));
};

  return (
<div className="flex p-10 m-5 rounded-md">
{userServices && userServices.map((service, index) => (
    <div key={service.id} className="flex flex-col bg-gray-700 rounded-md p-4 m-10">
      <div className="flex flex-col"> 
          <div className="flex flex-col justify-between mb-2">
            <h2 className="text-lg font-bold text-white">Service Name:</h2>
            <span className="text-lg font-bold text-orange-500">{service.name}</span>
          </div>
          <div className="flex flex-col">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => toggleService(service.id)}
            >
              {serviceIsOpen[service.id] ? 'Hide Sessions' : 'Show Sessions'}
            </button>
            {serviceIsOpen[service.id] && (
              <div className="flex flex-col">
                {service.sessions.map((session, index) => (
                  <div key={session.id} className="flex flex-col"> 
                    <div className="flex flex-col"> 
                      <div className="flex flex-col mb-2">
                        <p className="text-white">Session ID:</p>
                        <span className="text-lg font-bold text-orange-500">{session.id}</span>
                      </div>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => toggleSession(session.id)}
                      >
                        {sessionIsOpen[session.id] ? 'Hide Session Info' : 'Show Session Info'}
                      </button>
                      {sessionIsOpen[session.id] && (
                        <div className="flex flex-col">
                          {session.reservations.map((reservation, index) => (
                            <div key={reservation.client.id} className="flex flex-col"> 
                              <div className="flex flex-row justify-between mb-2">
                                <span className="text-lg font-bold text-orange-500">{reservation.client.firstName} {reservation.client.lastName}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  ))}
</div>
  
  )
}

export default MyBookedServices
import React from "react";

export function MyReservations({
  userReservations,
  toggleExpand,
  handleDelete,
  moreDetails
}) {

  return <div className="flex flex-col bg-slate-950 p-10 m-5 rounded-md">
        <div className="flex flex-col mb-4">
          <h1 className='text-3xl font-bold'>My Reservations</h1>
        </div>
        <div className="flex flex-row overflow-x-auto max-h-96 m-5">
          {userReservations && userReservations.map(reservation => <div key={reservation.reservationId} className="bg-gray-700 flex flex-col rounded-md p-4 m-10 overflow-y-auto">
              <div className="flex flex-col">
                <div className="flex flex-row gap-5 mb-2">
                  <h2 className="text-lg font-bold text-white">Service Name:</h2>
                  <span className="text-lg font-bold text-orange-500">{reservation.service_name}</span>
                </div>
                <div className="flex flex-row gap-5 mb-2">
                  <p className="text-white">Session Start:</p>
                  <span className="text-lg font-bold text-orange-500">{new Date(reservation.session_when_start).toLocaleString()}</span>
                </div>
                <div className="flex flex-row gap-5 mb-2">
                  <p className="text-white">Session Duration:</p>
                  <span className="text-lg font-bold text-orange-500">{reservation.session_duration_min} minutes</span>
                </div>
                <div className="flex flex-row gap-5 mb-2">
                  <p className="text-white">Session Instructor:</p>
                  <span className="text-lg font-bold text-orange-500">{reservation.service_freelancer_name}</span>
                </div>
                {moreDetails.includes(reservation.reservationId) && <div className="flex flex-col">
                    <div className="flex flex-row justify-between mb-2">
                      <p className="text-white">Session Status:</p>
                      <span className="text-lg font-bold text-orange-500">{reservation.session_status}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <p className="text-white">Session Capacity:</p>
                      <span className="text-lg font-bold text-orange-500">{reservation.session_capacity}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <p className="text-white">Service Rate:</p>
                      <span className="text-lg font-bold text-orange-500">${reservation.service_rate} per {reservation.service_rate_time}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <p className="text-white">Session Description:</p>
                      <span className="text-lg font-bold text-orange-500">{reservation.session_description}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <p className="text-white">Created At:</p>
                      <span className="text-lg font-bold text-orange-500">{new Date(reservation.when_created).toLocaleString()}</span>
                    </div>
                  </div>}
                <div className="flex justify-center gap-2 mt-2">
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={() => toggleExpand(reservation.reservationId)}>
                    {moreDetails.includes(reservation.reservationId) ? 'Show Less' : 'Show More'}
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(reservation.reservationId)}>
                    Cancel RSVP
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>;
}
  
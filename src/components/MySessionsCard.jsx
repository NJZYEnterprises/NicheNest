import React, { useState, useEffect } from 'react';
import Fetcher from "../fetcher.js";

const MySessionsCard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
         fetcher.route("freelancers").get(setFreelancers);
      }, [])  

  const handleSessionClick = async (sessionId) => {
    setLoading(true);
    try {
      const response = await Fetcher.route(`/sessions/${sessionId}`).get();
      setSelectedSession(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch session details.");
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedSession(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5 bg-gray-800 rounded-md">
      {selectedSession ? (
        <div>
          <h2 className="text-2xl text-white mb-4">{selectedSession.title}</h2>
          <p className="text-white mb-4">{selectedSession.description}</p>
          <button onClick={handleBackClick} className="text-blue-500 hover:underline">Back to Sessions</button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl text-white mb-4">My Sessions</h2>
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session.id} className="bg-gray-700 p-4 rounded-md cursor-pointer" onClick={() => handleSessionClick(session.id)}>
                <h3 className="text-xl text-white">{session.title}</h3>
                <p className="text-gray-300">{session.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MySessionsCard;

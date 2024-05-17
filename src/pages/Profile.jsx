import React, { useState } from 'react';
import ProfileDetailsCard from '../components/ProfileDetailsCard'
import MySessionsCard from '../components/MySessionsCard'
import CreateServiceCard from '../components/CreateServiceCard'
import CreateSessionCard from '../components/CreateSessionCard'
import Fetcher from "../fetcher.js"

const Profile = () => {
  const [activeCard, setActiveCard] = useState('profileDetails');
  //TODO: replace with context user state and check if they are freelancer to show sessions button 
  const [userDetails, setUserDetails] = useState(false)

 //TODO: This will fetch user data if necessary from /me and place in state
  // useEffect(() => {
  //        fetcher.route("/users/me").get(setUserDetails);
  //      }, [])  
  //   }

  const handleButtonClick = (cardName) => {
    setActiveCard(cardName);
  };

  return (
    <div>
      <div>
        <div className="border-2 border-dashed border-white p-20 m-5">
            <h1>CAROUSEL HERE</h1>
        </div>
      </div>
      <div className="bg-gray-900 flex justify-center items-center p-10 gap-10 m-5 rounded-md">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleButtonClick('profileDetails')}>
          Profile Details
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
           onClick={() => handleButtonClick('mySessions')}>
          My Sessions  
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleButtonClick('createService')}>
          Create Service  
        </button>
        {

        }
        {userDetails &&
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleButtonClick('createSessions')}>
            Create Session
          </button>
        }
      </div>
      <div>
          {activeCard === 'profileDetails' && <ProfileDetailsCard />}
          {activeCard === 'mySessions' && <MySessionsCard />}
          {activeCard === 'createService' && <CreateServiceCard />}
          {activeCard === 'createSession' && <CreateSessionCard />}
      </div>
    </div>
  )
}

export default Profile
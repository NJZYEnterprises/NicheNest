import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import ProfileDetailsCard from '../components/ProfileDetailsCard'
import MySessionsCard from '../components/MySessionsCard'
import CreateServiceCard from '../components/CreateServiceCard'
import CreateSessionCard from '../components/CreateSessionCard'
import UserCarousel from '../components/UserCarousel'
import Fetcher from "../fetcher.js"

const Profile = () => {
  const [activeCard, setActiveCard] = useState('profileDetails');
  const [userDetails, setUserDetails] = useState([])
  const [userImages, setUserImages] = useState([])
  const { userId } = useContext(AuthContext)
  const fetcher = new Fetcher("api");

//get images and put it into a state and then pass them threough the carousel 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetcher.route(`/users/user/${userId?.uid}`).get();
        setUserDetails(userData);
        setUserImages(userData?.images)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [userId]);

  console.log('details',userDetails)
  console.log('images',userImages)


  const handleButtonClick = (cardName) => {
    setActiveCard(cardName);
  };

  return (
    <div>
    {/* *****************************************
    TODO: allow user to select profile image,
    and perform crud. may need to make custom 
    carousel.
    ***************************************** */}
      <div className="m-5">
        {userImages?.length > 0 ? (
           <UserCarousel userImages={userImages} />
            ) : (
       <div className="text-gray-500">Loading...</div>
        )}
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
          {activeCard === 'profileDetails' && <ProfileDetailsCard userDetails={userDetails} setUserDetails={setUserDetails} />}
          {activeCard === 'mySessions' && <MySessionsCard />}
          {activeCard === 'createService' && <CreateServiceCard />}
          {activeCard === 'createSession' && <CreateSessionCard />}
      </div>
    </div>
  )
}

export default Profile
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import ProfileDetailsCard from '../components/ProfileDetailsCard'
import MySessionsCard from '../components/MySessionsCard'
import UserCarousel from '../components/UserCarousel'
import Fetcher from "../fetcher.js"
import CreateServiceForm from '../components/CreateServiceForm.jsx';
import CreateSession from '../components/CreateSessionForm.jsx';

const Profile = () => {
  const [activeCard, setActiveCard] = useState('profileDetails');
  const [userDetails, setUserDetails] = useState([])
  const [userImages, setUserImages] = useState([])
  const { userId } = useContext(AuthContext)
  const fetcher = new Fetcher("api");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const userData = await fetcher.route(`/users/user/${userId.uid}`).get();
          setUserDetails(userData);
          setUserImages(userData.images)
        } else {
          console.log('Error, userId is not truthy')
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [userId]);
  

  console.log('user services offered',userDetails.services)
//*****************************************************************************/
//TODO: Add ability that one refresh it displays currently clicked card       *
//Options to store activeCard state in local storage to refer too on refresh  *
//****************************************************************************/
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
      <div>
      </div>
      <div className="bg-gray-900 flex justify-center items-center p-10 gap-10 rounded-md">
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
        {userDetails.services && userDetails.services.length > 0 &&
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleButtonClick('createSession')}>
            Create Session
          </button>
        }
      </div>
      <div>
          {activeCard === 'profileDetails' && 
          <ProfileDetailsCard 
            userDetails={userDetails} 
            setUserDetails={setUserDetails} 
            userImages={userImages}
            setUserImages={setUserImages}
          />}
          {activeCard === 'mySessions' && <MySessionsCard />}
          {activeCard === 'createService' && <CreateServiceForm />}
          {activeCard === 'createSession' && <CreateSession service={userDetails?.services[0]}/>}
      </div>
    </div>
  )
}

export default Profile
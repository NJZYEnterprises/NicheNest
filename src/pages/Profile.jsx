import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import ProfileDetailsCard from '../components/ProfileDetailsCard'
import MySessionsCard from '../components/MySessionsCard'
import UserCarousel from '../components/UserCarousel'
import Fetcher from "../fetcher.js"
import CreateServiceForm from '../components/CreateServiceForm.jsx';
import CreateSession from '../components/CreateSessionForm.jsx';
import myString from '../utils/myString.cjs';
import Calendar from '../components/Calendar.jsx';

const Profile = () => {
  const cardOptions = ['profileDetails', 'mySessions', 'createService', 'createSession', 'myCalendar'];
  const [activeCard, setActiveCard] = useState(cardOptions[0]);
  const [userDetails, setUserDetails] = useState({})
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

  const cardName = (option) => {
    return myString.capitalize(myString.splitByCapital(option).join(' '));
  }

  const hideCard = (option) => {
    switch (option) {
      case 'createSession': return !userDetails.services || userDetails.services.length < 1;
    }
    return false;
  }

  const ActiveCard = ({ activeCard }) => {
    switch (activeCard) {
      case 'profileDetails': return <ProfileDetailsCard
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        userImages={userImages}
        setUserImages={setUserImages}
      />;
      case 'mySessions': return <MySessionsCard />;
      case 'createService': return <CreateServiceForm />;
      case 'createSession': return <CreateSession services={userDetails?.services} />;
        // return userDetails.services && userDetails.services.length > 0 &&
        //   <CreateSession service={userDetails?.services[0]} />;
      case 'myCalendar': return <div className='calendar-center'>
        <Calendar user={userDetails}/>
      </div>;
    }

    return <div>No component found for active card "{activeCard}"</div>;
  }

  //*****************************************************************************/
  //TODO: Add ability that one refresh it displays currently clicked card       *
  //Options to store activeCard state in local storage to refer too on refresh  *
  //****************************************************************************/
  const handleButtonClick = (cardOption) => {
    setActiveCard(cardOption);
  };

  return (
    <div>
      <div>
      </div>
      <div className="flex justify-center items-center p-10 gap-10 rounded-md" style={{ backgroundImage: "linear-gradient(var(--surfaceColor), var(--cafeNoir) 30% 70%, var(--surfaceColor))" }}>
        {
          cardOptions.map(option => (
            !hideCard(option) &&
            <button className="view-button text-white font-bold py-2 px-2 rounded"
              onClick={() => handleButtonClick(option)}>
              {cardName(option)}
            </button>
          ))
        }
      </div>
      <div>
        <ActiveCard activeCard={activeCard} />
      </div>
    </div>
  )
}

export default Profile
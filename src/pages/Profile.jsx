import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import { UserContext } from '../components/UserProvider.jsx';
import ProfileDetailsCard from '../components/ProfileDetailsCard'
import MySessionsCard from '../components/MySessionsCard'
import UserCarousel from '../components/UserCarousel'
import Fetcher from "../fetcher.js"
import ServiceForm from '../components/ServiceForm.jsx';
import CreateSession from '../components/CreateSessionForm.jsx';
import myString from '../utils/myString.cjs';
import Calendar from '../components/Calendar.jsx';
import { useNavigate } from 'react-router-dom';

const fetcher = new Fetcher("api");

const Profile = () => {
  const cardOptions = ['profileDetails', 'mySessions', 'createService', 'createSession', 'myCalendar'];
  const [activeCard, setActiveCard] = useState(cardOptions[0]);
  const { user } = useContext(UserContext);
  const { userId } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
  }, [userId]);

  const cardName = (option) => {
    return myString.capitalize(myString.splitByCapital(option).join(' '));
  }

  const hideCard = (option) => {
    switch (option) {
      case 'createSession': return !user?.services || user.services.length < 1;
    }
    return false;
  }

  const ActiveCard = ({ activeCard }) => {
    switch (activeCard) {
      case 'profileDetails': return <ProfileDetailsCard />;
      case 'mySessions': return <MySessionsCard />;
      case 'createService': return <ServiceForm />;
      case 'createSession': return <CreateSession services={user?.services} />;
      case 'myCalendar': return <div className='calendar-center'>
        <Calendar user={user}/>
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
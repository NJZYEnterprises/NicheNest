import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider"
import { UserContext } from '../components/UserProvider.jsx';
import ProfileDetailsCard from '../components/ProfileDetailsCard'
import MySessionsCard from '../components/MySessionsCard'
import UserCarousel from '../components/UserCarousel'
import Fetcher from "../fetcher.js"
import ServiceForm from '../components/ServiceForm.jsx';
import CreateSession from '../components/CreateSessionForm.jsx';
import MyReservations from '../components/MyReservations';
import MyServices from "../components/MyServices.jsx";
import myString from '../utils/myString.cjs';
import Calendar from '../components/Calendar.jsx';
import MyButton from '../components/buttons/MyButton.jsx';

const fetcher = new Fetcher("api");

const Profile = () => {
  const cardOptions = ['profileDetails', 'myReservations', 'myServices', 'myCalendar'];
  const [activeCard, setActiveCard] = useState(localStorage.getItem('activeCard') ?? cardOptions[0]);
  const { user } = useContext(UserContext);
  const { userId } = useContext(AuthContext)

  useEffect(() => {
    localStorage.setItem("activeCard", activeCard);
  }, [activeCard]);

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
      case 'myReservations': return <MyReservations />;
      case 'myServices': return <MyServices />;
      case 'myCalendar': return <div className='calendar-center'>
        <Calendar user={user} />
      </div>;
    }

    return <div className='surface_color card'>No component found for active card "{activeCard}"</div>;
  }

  const handleButtonClick = (cardOption) => {
    setActiveCard(cardOption);
  };

  return (
    <div className='flex flex-col flex-grow'>
      <div className="flex justify-center items-center p-10 gap-10 rounded-md"
        style={{ backgroundImage: "linear-gradient(var(--surfaceColor), var(--cafeNoir) 30% 70%, var(--surfaceColor))"}}>
        {
          cardOptions.map(option => (
            !hideCard(option) &&
            <MyButton text={cardName(option)} onClick={() => handleButtonClick(option)} />
          ))
        }
      </div>
      <div className='flex flex-col flex-grow'>
        <ActiveCard activeCard={activeCard} />
      </div>
    </div>
  )
}

export default Profile
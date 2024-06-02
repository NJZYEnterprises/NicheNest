import React, { useState, useContext, } from 'react';
import { UserContext } from './UserProvider.jsx';
import MyService from './MyService.jsx';
import ServiceForm from './ServiceForm.jsx';
import ToggleButton from './buttons/ToggleButton.jsx';

const MyServices = () => {
  const { user } = useContext(UserContext);

  const toggleCreate = useState(false);
  const showCreateForm = toggleCreate[0];

  const userServices = user?.services ?? [];

  // TODO: min height screen?
  return (
    <div className="surface-color card flex flex-col p-10 m-5">
      <div className="mb-4 flex flex-row">
        <div className='flexItemUniformSize'></div>
        <h1 className="text-4xl font-bold">My Services</h1>
        <div className='flexItemUniformSize flex-row justify-end gap-4'>
          <ToggleButton state={toggleCreate} text={['Create New', 'Cancel New']} cssType='submit' />
        </div>
      </div>
      {showCreateForm && <ServiceForm />}
      <div className="m-10">
        {userServices && userServices.map((service, i) => <MyService key={i} service={service} />)}
      </div>
    </div>
  );
};


export default MyServices;

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import Form, { InputData } from './Form';
import { UserContext } from './UserProvider';
import moment from 'moment';

const fetcher = new Fetcher("api");

const CreateSession = ({ service, services, reactiveData }) => {

  if (!service && (!services || services.length < 1)) return (
    <div className="surface-color card w-max p-2 m-2">
      Session form does not have any services to create a session for!
    </div>
  )

  const { userId } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);

  const handleSubmit = async (sessionData) => {
    sessionData.when_start = new Date(`${sessionData.date}` + `T` + `${sessionData.time}`).toISOString();

    const service_id = service?.id ?? services.find(srvc => srvc.name === sessionData.service_name)?.id;
    await fetcher.setToken(userId.accessToken).route(["sessions", service_id]).post(sessionData);

    updateUser();
  }

  const inputs = [
    { name: "date", type: "date" },
    { name: "time", type: "time" },
    { name: "duration_min", label: "How Many Minutes", type: "Number", },
    { name: "status", options: ["active", "inactive"], enforceOptions: true },
    { name: "capacity", type: "Number", label: "Capacity" },
    { name: "description", type: "textarea", label: "Description" },
  ];
  if (Array.isArray(services) && !service) {
    if (services.length === 1) service = services[0];
    else inputs.unshift({
      name: "service_name", label: "Service", options: services.map(s => s.name), enforceOptions: true
    });
  }

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].hasOwnProperty("required"))
      inputs[i].required = true;

    inputs[i] = new InputData(inputs[i]);
  }

  return (
    <>
      <div className='flex justify-center m-4'>
        <Form title={"New Session:"} submitFn={handleSubmit} {...{ inputs, reactiveData }} />
      </div>
    </>
  )
}
export default CreateSession
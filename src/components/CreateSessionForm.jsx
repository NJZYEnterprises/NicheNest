import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import Form, { InputData } from './Form';

const fetcher = new Fetcher("api");

const CreateSession = ({ services }) => {
  if (!services || services.length < 1) return (
    <div className="surface-color card w-max p-2 m-2">
      Session form does not have any services to create a session for!
    </div>
  )

  const { userId } = useContext(AuthContext)

  const handleSubmit = (sessionData) => {
    sessionData.when_start = `${sessionData.date}` + `T` + `${sessionData.time}` + `:00.000Z`

    const service_id = services.find(srvc => srvc.name === sessionData.service_name)?.id;
    fetcher.setToken(userId.accessToken).route(["sessions", service_id]).post(sessionData);
  }

  const inputs = [
    { name: "service_name", label: "Service", options: services.map(s => s.name), enforceOptions: true },
    { name: "date", type: "date" },
    { name: "time", type: "time" },
    { name: "duration_min", label: "How Many Minutes", type: "Number", },
    { name: "status", options: ["active", "inactive"], enforceOptions: true },
    { name: "capacity", type: "Number", label: "Capacity" },
    { name: "description", type: "textarea", label: "Description" },
  ];
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].hasOwnProperty("required"))
      inputs[i].required = true;

    inputs[i] = new InputData(inputs[i]);
  }

  return (
    <>
      <div className='flex justify-center m-4'>
        <Form title={"New Session:"} submitFn={handleSubmit} inputs={inputs} />
      </div>
    </>
  )
}
export default CreateSession
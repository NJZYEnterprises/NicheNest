import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import { UserContext } from "./UserProvider";
import Form, { InputData } from './Form';

const CreateSession = ({ service }) => {
  const fetcher = new Fetcher("api");
  const { userId } = useContext(AuthContext)
  
  const handleSubmit = (sessionData) => {
    sessionData.when_start = `${sessionData.date}` + `T` + `${sessionData.time}` + `:00.000Z`
    fetcher.setToken(userId.accessToken).route(`sessions/${service?.id}`).post(sessionData)
  }

  const inputs = [
    { name: "date", type: "date" },
    { name: "time", type: "time" },
    { name: "duration_min", label: "How Many Minutes", type: "Number", },
    { name: "status", label: "Active/Inactive", type: "select", },
    { name: "capacity", type: "Number", label: "Capacity"},
    { name: "description", type: "textarea", label: "Description"},
  ];
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].hasOwnProperty("requiered"))
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
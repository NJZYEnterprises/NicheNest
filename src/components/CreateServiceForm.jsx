import React, { useContext } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import { UserContext } from "../components/UserProvider";
import Form, { InputData } from './Form';

const CreateServiceForm = () => {
  const { user } = useContext(UserContext);
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");

  const submitForm = (serviceData) => {
    serviceData.freelancer_id = user?.id;
    fetcher.setToken(userId.accessToken).route("services").post(serviceData);
    window.location.reload();

  }

  const inputs = [
    { name: "name" },
    { name: "tags", type: "textarea", required: false },
    { name: "description", type: "textarea", required: false },
    { name: "rate", label: "Price per Unit", type: "number" },
    { name: "rate_time", label: "Billing Unit" },
  ];
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].hasOwnProperty("required"))
      inputs[i].required = true;

    inputs[i] = new InputData(inputs[i]);
  }

  return <div className='flex justify-center m-4'>
    <Form title={"New Service:"} submitFn={submitForm} inputs={inputs} />
  </div>
}

export default CreateServiceForm
import React, { useContext } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import { UserContext } from "./UserProvider";
import Form, { InputData } from './Form';

const ServiceForm = ({ editService }) => {
  const { user, updateUser } = useContext(UserContext);
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");

  const submitForm = async (serviceData) => {
    fetcher.setToken(userId.accessToken).route("services");
    if (editService) {
      await fetcher.addRoute(editService.id).patch(serviceData);
    } else {
      serviceData.freelancer_id = user?.id;
      await fetcher.post(serviceData);
    }
    updateUser();
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
    <Form defaultData={editService} title={`${editService ? "Edit" : "New"} Service:`} submitFn={submitForm} inputs={inputs} />
  </div>
}

export default ServiceForm
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import { UserContext } from "../components/UserProvider";

const CreateServiceForm = () => {
  // const { userId } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { userId } = useContext(AuthContext)
  const fetcher = new Fetcher("api");

  const [serviceData, setServiceData] = useState({
    name: "",
    rate: "",
    rate_time: "",
    freelancer_id: user?.id
  })



  const handleChange = event => {
    const { name, value } = event.target
    setServiceData({
      ...serviceData,
      [name]: value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fetcher.setToken(userId.accessToken).route("services").post(serviceData);
  }

  return (
    <div className='flex justify-center'>
      <div className="mb-3 containerForm" >
        <h1>Creat new Session:</h1>
        <form onSubmit={handleSubmit} className="columnContainer mx-3">
          <div className="inputLine">
            <div >
              <label htmlFor={'name'}>Service Name: </label>
              <input
                type='text'
                id="name"
                name="name"
                value={serviceData.name}
                onChange={handleChange}
                required />
            </div>
          </div>
          <div className="inputLine">
            <label htmlFor={'rate'}>Service Cost: </label>
            <input
              type='number'
              id="rate"
              name="rate"
              value={serviceData.rate}
              onChange={handleChange}
              required />
          </div>
          <div className="inputLine">
            <label htmlFor={'rate_time'}>Per Unit:</label>
            <input
              type='text'
              name="rate_time"
              id="rate_time"
              value={serviceData.rate_time}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="submit">Post!</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default CreateServiceForm
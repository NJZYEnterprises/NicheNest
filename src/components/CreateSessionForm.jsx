import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import Fetcher from "../fetcher";
import { UserContext } from "./UserProvider";





const CreateSession = ( service ) => {
  const fetcher = new Fetcher("api");
  const { user } = useContext(UserContext);
  const { userId } = useContext(AuthContext)

  console.log(`user`, user)
  
  
  const [sessionData, setSessionData] = useState({
    date: "",
    when_start: "",
    duration_min: "",
    status: "active",
    capacity: "",
    service_id: 3//pass this down from the service
  })

  const dt = `${sessionData.date}`+ `T` + `${sessionData.when_start}` + `:00.000Z`


  const handleChange = event => {
    const { name, value } = event.target
    setSessionData({
      ...sessionData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionData.when_start= `${sessionData.date}`+ `T` + `${sessionData.when_start}` + `:00.000Z`
    fetcher.setToken(userId.accessToken).route("sessions").post(sessionData)
    console.log(sessionData, dt)
  }


  return (
    <>
      <div className='flex justify-center'>
        <div className="mb-3 containerForm" >
          <form onSubmit={handleSubmit} className="columnContainer mx-3">
            <div className="inputLine">
              <label htmlFor={'date'}>When days will this service be available?</label>
              <input type='date'
                id="date"
                name="date"
                value={sessionData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputLine">
              <label htmlFor={'when_start'}>What time will the sessions start?</label>
              <input type='time'
                id='when_start'
                name='when_start'
                value={sessionData.when_start}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputLine">
              <label htmlFor={'duration_min'}>How many minutes will the session be?</label>
              <input type='number'
                className = 'text-right'
                id='duration_min'
                name= 'duration_min'
                value={sessionData.duration_min}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputLine">
              <label htmlFor={'capacity'}>How many people will be allowed in this session?</label>
              <input type='number'
                className = 'text-right'
                id='capacity'
                name='capacity'
                value={sessionData.capacity}
                onChange={handleChange}
                required
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="submit">Create</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateSession
import React, { useState } from 'react';
import Fetcher from "../fetcher.js"

const ProfileDetailsCard = () => {
  const [editing, setEditing] = useState(false);
  //TODO: replace state with user state that holds the current logged in users data
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890123',
    email: 'johndoe@example.com',
    username: 'dj23',
    street_address: '123 Main St',
    zip_code: '123456',
    city: 'Anytown',
    state: 'CA',
  });
  const fetcher = new Fetcher("api");
console.log(profile)
  const handleEdit = async () => {
    if (editing) {
      try {
        await handleSubmit();
        setEditing(false); // After successful save, switch back to view mode
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      setEditing(true); 
    }
  };
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      //TODO: replace with user state that contains these id's 
      const userId = '2'
      const locationId = false
      if(locationId) {
        await fetcher.route(`/users/${userId}`).patch(profile)
        await fetcher.route(`/location/${locationId}`).patch(profile)
      } else {
        await fetcher.route(`/users/${userId}`).patch(profile)
        await fetcher.route(`/location/${userId}`).post(profile)
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const renderField = (id, label, type = 'text') => {
    return (
      <div className="mb-3 bg">
        <label className="block text-gray-400" htmlFor={id}>{label}</label>
        {editing ? (
          <input
            className=" p-2 text-sm text-white text-center bg-gray-900 border border-gray-700 rounded "
            id={id}
            type={type}
            value={profile[id]}
            onChange={handleChange}
          />
        ) : (
          <p className="text-white">{profile[id]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="m-5 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Profile Details</h2>
      <div className="flex">
        <div className="w-1/2 pr-4 bg-">
          {renderField('firstName', 'First Name')}
          {renderField('lastName', 'Last Name')}
          {renderField('username', 'Username',)}
          {renderField('email', 'Email', 'email')}
        </div>
        <div className="w-1/2 pl-4">
          {renderField('phoneNumber', 'Phone', 'tel')}
          {renderField('street_address', 'Street Address')}
          {renderField('zip_code', 'Zip Code')}
          {renderField('city', 'City')}
          <div className="mb-3">
            <label className="block text-gray-400" htmlFor="state">State</label>
            {editing ? (
              <select
                className="p-2 text-sm text-white bg-gray-900 border border-gray-700 rounded"
                id="state"
                value={profile.state}
                onChange={handleChange}
              >
                {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            ) : (
              <p className="text-white">{profile.state}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEdit}
        >
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;

import React, { useState, useContext, useEffect } from 'react';
import Fetcher from "../fetcher.js";
import UserCarousel from "./UserCarousel";
import { AuthContext } from "../auth/authProvider";
import { UserContext } from "./UserProvider.jsx";

const ProfileDetailsCard = ({userDetails, setUserDetails, userImages}) => {
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");
  const [editMode, setEditMode] = useState(false); // Global edit mode
  const [editModeField, setEditModeField] = useState(null); // Track field in edit mode
  const [originalField, setOriginalField] = useState(editModeField)
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    username: "",
    bio: "",
    street_address: "",
    zip_code: "",
    city: "",
    state: ""
  });
  const [originalProfile, setOriginalProfile] = useState(profile)


  useEffect(() => {
    if (userDetails) {
      setProfile({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        phoneNumber: userDetails.phoneNumber || "",
        email: userDetails.email || "",
        username: userDetails.username || "",
        bio: userDetails.bio || "",
        street_address: userDetails.location?.street_address || "",
        zip_code: userDetails.location?.zip_code || "",
        city: userDetails.location?.city || "",
        state: userDetails.location?.state || ""
      });
      setOriginalProfile({ ...profile });
    }
  }, [userDetails]);
  
  const toggleEditMode = () => {
    if (editMode) {
      // Exit edit mode, reset to original profile
      setProfile(originalProfile);
    } else {
      // Enter edit mode, save the current profile as the original
      setOriginalProfile(profile);
    }
    setEditMode(!editMode);
    setEditModeField(null); // Exit any individual field edit mode
  };

  const enterFieldEditMode = (field) => {
    if(editModeField) {
      setEditModeField(originalField);
    } else {
      setOriginalField(editModeField)
    }
    setEditModeField(field);
  };

  const exitFieldEditMode = () => {
    if (editModeField) {
      setProfile({ ...profile, [editModeField]: originalProfile[editModeField] });
    }
    setEditModeField(null);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };

  const handleSave = async (field) => {
    try {
      const updatedField = { [field]: profile[field] };
      if (['firstName', 'lastName', 'phoneNumber', 'email', 'username', 'bio'].includes(field)) {
        await fetcher.route(`/users/${userId.uid}`).patch(updatedField);
      } else {
        await fetcher.route(`/locations/${userId.uid}/location`).patch(updatedField);
      }
      setOriginalProfile({ ...originalProfile, [field]: profile[field] });
      setProfile({ ...profile, [field]: profile[field] }); // Update profile state
      console.log('Updated profile:', profile); // Add this line

      exitFieldEditMode();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const renderField = (id, label, type = 'text') => {
    const inputElement = type === 'textarea' ? (
      <textarea
        className="p-2 text-sm text-white text-center bg-gray-900 border border-gray-700 rounded w-full"
        id={id}
        rows="4"
        value={profile[id]}
        onChange={handleChange}
      />
    ) : (
      <input
        className="p-2 text-sm text-white text-center bg-gray-900 border border-gray-700 rounded w-full"
        id={id}
        type={type}
        value={profile[id]}
        onChange={handleChange}
      />
    );

    return (
      <div className="mb-3">
        <label className="block text-gray-400" htmlFor={id}>{label}</label>
        {editMode && editModeField !== id && (
          <button className="edit-icon" onClick={() => enterFieldEditMode(id)}>
            🖍️
          </button>
        )}
        {editModeField === id ? (
          <div>
            {inputElement}
            <div className="flex justify-end mt-2">
              <button className="save-icon mr-2" onClick={() => handleSave(id)}>
                👍
              </button>
              <button className="cancel-icon" onClick={exitFieldEditMode}>
                ❌
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white">{profile[id]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="m-5 bg-gray-700 p-6 rounded-lg shadow-lg">
    <div className="">
      <h2 className="text-xl font-bold mb-4">Profile Details</h2>
    </div>
      <div className="m-5">
        {userImages?.length > 0 ? (
           <UserCarousel userImages={userImages} />
            ) : (
        <div className="text-gray-500">Loading...</div>
        )}
      </div>
      <div className="flex justify-end mb-4">
      </div>
      <div className="flex">
        <div className="w-1/2 pr-4">
          {renderField('firstName', 'First Name')}
          {renderField('lastName', 'Last Name')}
          {renderField('username', 'Username')}
          {renderField('email', 'Email', 'email')}
          {renderField('bio', 'Bio', 'textarea')}
        </div>
        <div className="w-1/2 pl-4">
          {renderField('phoneNumber', 'Phone', 'tel')}
          {renderField('street_address', 'Street Address')}
          {renderField('zip_code', 'Zip Code')}
          {renderField('city', 'City')}
          {renderField('state', 'State')}
        </div>
      </div>
      <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleEditMode}
        >
          {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </button>
    </div>
  );
};

export default ProfileDetailsCard;

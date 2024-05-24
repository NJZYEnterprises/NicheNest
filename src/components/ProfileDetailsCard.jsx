import React, { useState, useContext, useEffect } from 'react';
import Fetcher from "../fetcher.js";
import UserCarousel from "./UserCarousel";
import AddImageForm from "./AddImageForm";
import { AuthContext } from "../auth/AuthProvider";
import { UserContext } from "./UserProvider.jsx";

const ProfileDetailsCard = ({userDetails, setUserDetails, userImages, setUserImages}) => {
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");
  const [editMode, setEditMode] = useState(false); 
  const [editModeField, setEditModeField] = useState(null);
  const [originalField, setOriginalField] = useState(editModeField)
  const [deleteMode, setDeleteMode] = useState(false); // New state for delete mode
  const [showInput, setShowInput] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [profileDetails, setProfileDetails] = useState({
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
  const [originalProfileDetails, setOriginalProfileDetails] = useState(profileDetails)
  useEffect(() => {
    if (userDetails) {
      setProfileDetails({
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
      setOriginalProfileDetails({ ...profileDetails });
    }
  }, [userDetails]);
  
  const toggleEditMode = () => {
    if (editMode) {
      setProfileDetails(originalProfileDetails);
    } else {
      setOriginalProfileDetails(profileDetails);
    }
    setEditMode(!editMode);
    setEditModeField(null); 
  };
  const enterFieldEditMode = (field) => {
    if(editModeField) {
      setEditModeField(originalFieldDetails);
    } else {
      setOriginalField(editModeField)
    }
    setEditModeField(field);
  };

  const exitFieldEditMode = () => {
    if (editModeField) {
      setEditModeField(null);
    }
    setProfileDetails({ ...profileDetails }); 
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfileDetails({ ...profileDetails, [id]: value });
  };

  const handleSave = async (field) => {
    try {
      const uid = userId.uid
      const updatedField = { [field]: profileDetails[field] };
      if (['firstName', 'lastName', 'phoneNumber', 'email', 'username', 'bio'].includes(field)) {
        await fetcher.route(`/users/${uid}`).patch(updatedField);
      } else {
        await fetcher.route(`/locations/${uid}/location`).patch(updatedField);
      }
      setOriginalProfileDetails({ ...originalProfileDetails, [field]: profileDetails[field] });
      exitFieldEditMode();
      console.log('Updated profile:', profileDetails); 
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
        value={profileDetails[id]}
        onChange={handleChange}
      />
    ) : (
      <input
        className="p-2 text-sm text-white text-center bg-gray-900 border border-gray-700 rounded w-full"
        id={id}
        type={type}
        value={profileDetails[id]}
        onChange={handleChange}
      />
    );
    return (
      <div className="mb-3">
      <label className="block text-gray-400" htmlFor={id}>{label}</label>
      {editModeField === id ? (
        <div>
          <div>
            {inputElement}
          </div>
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
        <div className="flex items-center">
          <p className="text-white flex-grow">{profileDetails[id]}</p>
          {editMode && editModeField === null && (
            <button className="edit-icon ml-2" onClick={() => enterFieldEditMode(id)}>
              🖍️
            </button>
          )}
        </div>
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
        {userImages && userImages.length > 0 ? (
        <div className="flex flex-col">
          {editMode && (
              <AddImageForm 
              setUserImages={setUserImages} 
              deleteMode={deleteMode} 
              setDeleteMode={setDeleteMode}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              />
            )
          }
          <UserCarousel
           userImages={userImages}
           setUserImages={setUserImages}
           deleteMode={deleteMode}
           setDeleteMode={setDeleteMode} 
           selectedImage={selectedImage}
           setSelectedImage={setSelectedImage}
           />
        </div>
      ) : (
        <div>Loading...</div>
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

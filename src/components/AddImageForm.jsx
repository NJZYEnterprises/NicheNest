import React, { useState, useContext } from 'react';
import Fetcher from "../fetcher.js";
import { displayTemporaryMessage } from "../utils/tempMessage.cjs";
import { AuthContext } from "../auth/AuthProvider";
import { UserContext } from './UserProvider.jsx';

const fetcher = new Fetcher("api");

const AddImageForm = ({ deleteMode, setDeleteMode, selectedImage, setSelectedImage, hasImages }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const { userId } = useContext(AuthContext);
  const { updateUser, updateFreelancers } = useContext(UserContext);

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleAddImage = async () => {
    if (!isValidUrl(imageUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    try {
      await fetcher
        .route('/images/add')
        .setToken(userId.accessToken)
        .post({ image_url: imageUrl });

      await updateCarousel();

      setError('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const handleDeleteImage = async () => {
    if (!selectedImage) {
      setError('Please select an image to delete');
      return;
    }
    try {
      await fetcher
        .route(`/images/${selectedImage.id}/delete`)
        .setToken(userId.accessToken)
        .delete();

      await updateCarousel();
      setSelectedImage(null);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const updateCarousel = async () => {
    return Promise.All([updateUser(), updateFreelancers()]);
  };

  const handleProfilePic = async () => {
    if (!selectedImage) {
      displayTemporaryMessage('Please Select An Image', setError);
      return null;
    }
    try {
      await fetcher
        .route(`/images/setProfilePicture`)
        .setToken(userId.accessToken)
        .post({ imageId: selectedImage.id });
      displayTemporaryMessage('Success!', setSuccessMessage);
      await updateCarousel();
    } catch (error) {
      setError('Error updating carousel')
      console.log('Error updating carousel:', error);
    }
  };

  const toggleInputField = () => {
    setShowInput(prevShowInput => !prevShowInput);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    if (deleteMode) {
      setSelectedImage(null);
    }
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  return (
    <div className="flex">
      <div className="flex flex-row-reverse">
        <button className="submit-button m-1 p-5 text-white rounded textShadow" onClick={toggleInputField}>
          {showInput ? "Cancel" : "Add Image"}
        </button>
        {hasImages && 
          <button className={"submit-button m-1 p-5 text-white rounded textShadow"} onClick={toggleDeleteMode}>
          {deleteMode ? "Exit" : "Edit Image"}
        </button>
        }
      </div>
      {showInput && (
        <div className="">
          <input
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="Enter image URL"
            className="p-2 m-2 border rounded w-56"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="p-2 w-32 border rounded submit-button text-white textShadow" onClick={handleAddImage} disabled={!imageUrl}>
            Submit Image
          </button>
        </div>
      )}
      {deleteMode && (
        <div className="flex flex-row-reverse">
          <button className="m-1 p-5 error-button text-white rounded textShadow" onClick={handleDeleteImage}>
            Delete Selected Image
          </button>
          <button className="m-1 p-5 error-button text-white rounded textShadow" onClick={handleProfilePic}>
            Make Profile Pic
          </button>
        </div>
      )}
      {error && <div className="p-2"><h2 className="text-xl font-bold text-red-700">{error}</h2></div>}
      {successMessage && <div className="p-2"><h2 className="text-xl font-bold text-green-950">Successfully Set Profile Picture!</h2></div>}
    </div>
  );
};

export default AddImageForm;

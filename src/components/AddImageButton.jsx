import React, { useState, useContext } from 'react';
import Fetcher from "../fetcher.js";
import { AuthContext } from "../auth/AuthProvider";

const AddImageButton = ({ setUserImages }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const { userId } = useContext(AuthContext);
  const fetcher = new Fetcher("api");

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
        .post({ image_url : imageUrl });

        await updateCarousel();
    
      setError('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding image:', error);
    } 
  };

  const updateCarousel = async () => {
    try {
        await fetcher
        .route('/images')
        .setToken(userId.accessToken)
        .get(setUserImages);
    } catch (error) {
      console.log('Error updating carousel:', error);
    }
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  return (
    <div className="">
      <input
        type="text"
        value={imageUrl}
        onChange={handleUrlChange}
        placeholder="Enter image URL"
        className="p-2 m-2 border rounded w-56"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="p-2 w-32 border rounded bg-slate-900 text-white" onClick={handleAddImage} disabled={!imageUrl}>
        Submit Image
      </button>
    </div>
  );
};

export default AddImageButton;

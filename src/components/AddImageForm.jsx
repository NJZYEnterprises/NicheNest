import React, { useState, useContext } from 'react';
import Fetcher from "../fetcher.js";
import { AuthContext } from "../auth/AuthProvider";

const AddImageForm = ({ setUserImages, deleteMode, setDeleteMode, selectedImage, setSelectedImage }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [showInput, setShowInput] = useState(false); 
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

  const handleDeleteImage = async () => {
    console.log('delete image hit', selectedImage)
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
    try {
        await fetcher
        .route('/images')
        .setToken(userId.accessToken)
        .get(setUserImages);
    } catch (error) {
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
    <div className="">
      <div className="flex flex-row-reverse">
        <button className="p-5 bg-slate-900 text-white rounded" onClick={toggleInputField}>
          {showInput ? "Cancel" : "Add Image"}
        </button>
        <button className="p-5 bg-slate-900 text-white rounded" onClick={toggleDeleteMode}>
          {deleteMode ? "Exit" : "Edit Image"}
        </button>
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
      <button className="p-2 w-32 border rounded bg-slate-900 text-white" onClick={handleAddImage} disabled={!imageUrl}>
        Submit Image
      </button>
      </div>
    )}
    {deleteMode && (
        <div className="flex flex-row-reverse">
          <button className="p-5 bg-red-500 text-white rounded" onClick={handleDeleteImage}>
            Delete Selected Image
          </button>
        </div>
      )}
    </div>
  );
};

export default AddImageForm;

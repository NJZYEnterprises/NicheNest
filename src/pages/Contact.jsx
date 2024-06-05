import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/'), 2000); // After someone presses submit, it will take them back to homepage in 2 seconds.
  };

  return (
    <div className="flex items-center justify-center surface-color card profile-spacing textShadow">
      {!submitted ? (
        <form 
          onSubmit={handleSubmit} 
          className="primary-color-t p-8 card w-full max-w-md transform transition-all duration-500 ease-in-out"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="mb-4">
            <label htmlFor="fullName" className="block">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              className="text-black  w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="text-black  w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 textShadow"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Successful Submit</h2>
          <p className="text-gray-700">Redirecting to home...</p>
        </div>
      )}
    </div>
  );
};

export default Contact;


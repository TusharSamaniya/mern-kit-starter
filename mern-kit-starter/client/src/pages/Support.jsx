import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../redux/support/supportServices';
import { useAlert } from '../contexts/AlertContext';

const Support = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch()
  const { showAlert } = useAlert()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { loading } = useSelector(state => state.support)

  const handleChange = (e) => {
    e.preventDefault()

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createMessage(formData, showAlert))
    setFormData({
      name: '',
      email: '',
      message: '',
    })
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-2xl font-bold text-center mb-4">Support</h2>
        <p className="text-center mb-6">We're here to help. Let us know how we can assist you!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'border-gray-300 focus:ring-blue-400'}`}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'border-gray-300 focus:ring-blue-400'}`}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'border-gray-300 focus:ring-blue-400'}`}
              placeholder="Type your message here"
            ></textarea>
          </div>
          <div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Support;

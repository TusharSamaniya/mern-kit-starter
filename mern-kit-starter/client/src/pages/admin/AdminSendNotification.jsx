import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from '../../contexts/AlertContext'
import { createNotificaiton } from '../../redux/admin/adminServices';
const SendNotification = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    users: [],
    notificationType: 'email'
  });

  const users = useSelector(state => state.admin.allUsers);
  const dispatch = useDispatch()
  const { showAlert } = useAlert()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUserSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      users: selectedOptions.includes('all') ? users.map(user => user._id.toString()) : selectedOptions
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
 
    // Handle the API call or other processing logic here
    dispatch(createNotificaiton(formData, showAlert))
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6">Send Notification</h2>

      <form onSubmit={handleSubmit}>
        {/* User Select */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Select Users</label>
        <select
          name="users"
          multiple
          value={formData.users}
          onChange={handleUserSelect}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg bg-white focus:border-blue-500"
        >
          <option value="all">All Users</option>
          {users && users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* Title */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter notification title"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:border-blue-500"
          required
        />

        {/* Description */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter notification description"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:border-blue-500"
          required
        />

        {/* Notification Type */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Notification Type</label>
        <div className="flex items-center mb-4 space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="notificationType"
              value="email notification"
              checked={formData.notificationType === 'email notification'}
              onChange={handleChange}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="notificationType"
              value="push notification"
              checked={formData.notificationType === 'push notification'}
              onChange={handleChange}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Push Notification</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default SendNotification;

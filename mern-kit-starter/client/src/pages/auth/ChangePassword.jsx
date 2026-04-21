import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/auth/authServices';
import { useTheme } from '../../contexts/ThemeContext';

const ChangePassword = () => {
  const { theme } = useTheme()
  const user = useSelector(state => state.auth.user)
  const [creds, setCreds] = useState({ password: '', newPassword: '', confirmNewPassword: '' });
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const dispatch = useDispatch()
  // Handle input changes for text fields
  const handleChange = (e) => {
    e.preventDefault();
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log(creds)
    creds.newPassword === creds.confirmNewPassword ? dispatch(changePassword(creds, navigate, showAlert)) : showAlert('New Password and Confirm Password are not same')

  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>

      <div className={`p-8 rounded-lg shadow-lg w-full max-w-lg  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>

        <h1 className="text-2xl font-bold mb-6">Change Password</h1>

        <form onSubmit={handleChangePassword}>
          {/* Current Password */}
          <div className="mb-4">
            <label className="block mb-2">Current Password</label>
            <input
              type="password"
              name='password'
              placeholder="Enter your current password"
              value={creds.currentPassword}
              onChange={handleChange}
              required
              className={`w-full p-2 border border-gray-300 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              name='newPassword'
              placeholder="Enter a new password"
              value={creds.newPassword}
              onChange={handleChange}
              required
              className={`w-full p-2 border border-gray-300 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            />
          </div>

          {/* Confirm New Password */}
          <div className="mb-4">
            <label className="block mb-2">Confirm New Password</label>
            <input
              name='confirmNewPassword'
              type="password"
              placeholder="Confirm your new password"
              value={creds.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full p-2 border border-gray-300 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            />
          </div>

          <button
            type='submit'
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

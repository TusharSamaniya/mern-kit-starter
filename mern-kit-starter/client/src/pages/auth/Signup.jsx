import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/auth/authServices';
import { useTheme } from '../../contexts/ThemeContext';
import defaultProfileImage from '../../assets/defaultProfileImage.png';

const Signup = () => {
  const { theme } = useTheme();
  const loading = useSelector(state => state.auth.loading)
  const [creds, setCreds] = useState({ name: '', email: '', password: '', phone: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(defaultProfileImage);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : defaultProfileImage);
  };

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profileImage) formData.append('profileImage', profileImage);
    formData.append('creds', JSON.stringify(creds));
    dispatch(signup(formData, navigate, showAlert));
  };

  return (
    <div className={` min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        <form className="space-y-2" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Profile Image Input and Preview */}
          <div className="flex flex-col items-center">
            <img src={previewUrl} alt="Profile Preview" className="mb-4 h-24 w-24 rounded-full object-cover shadow-md" />
            <label htmlFor="profileImage" className="block text-sm font-medium">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={creds.name}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={creds.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            />
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={creds.phone}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={creds.password}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`w-full py-3 rounded-md shadow-lg ${loading ? 'bg-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  {/* Loading Spinner */}
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="4" />
                    <path d="M4 12h16" strokeWidth="4" />
                  </svg>
                  Loading...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>

        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

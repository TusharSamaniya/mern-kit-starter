import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '../../contexts/ThemeContext';
import { createAdmin } from '../../redux/admin/adminServices';


const CreateAdmin = () => {
    const { theme } = useTheme();
    const loading = useSelector(state => state.auth.loading)
    const [creds, setCreds] = useState({ name: '', email: '', password: '', phone: '', role: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useAlert();


    const handleChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAdmin(creds, navigate, showAlert));
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Admin</h2>

                <form className="space-y-2" onSubmit={handleSubmit} encType="multipart/form-data">

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

                    {/* role Input */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium">Role</label>

                        <select name="role" id="role" onChange={handleChange} required
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                        >
                            <option value="superAdmin">Super Admin</option>
                            <option value="userManager">User Manager</option>
                            <option value="marketingManager">Marketing Manager</option>
                        </select>
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
                    <Link to="/adminLogin" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CreateAdmin;

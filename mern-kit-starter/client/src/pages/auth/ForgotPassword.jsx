import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAlert } from '../../contexts/AlertContext';
import { forgotPassword } from '../../redux/auth/authServices';
import { useTheme } from '../../contexts/ThemeContext';
import Loader from '../../components/Loader';

const ForgotPassword = () => {
    const { theme } = useTheme()
    const [creds, setCreds] = useState({ password: '' });
    const { token } = useParams()
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleChange = (e) => {
        e.preventDefault();
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(creds.password, token, navigate, showAlert));
    };
    if (loading) {
        return <Loader />
    }
    return (
        <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className={`p-8 rounded-lg shadow-lg w-full max-w-md  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={creds.password}
                            onChange={handleChange}
                            required
                            className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}
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
                                'Forgot Password'
                            )}
                        </button>
                    </div>
                </form>

                {/* Back to Login */}
                <div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Remembered your password?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

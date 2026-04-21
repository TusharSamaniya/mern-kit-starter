import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../contexts/ThemeContext';
import { useAlert } from '../../contexts/AlertContext';
import { useNavigate } from 'react-router-dom';
import { otpLogin } from '../../redux/auth/authServices';


const OTPLogin = () => {
    const { theme } = useTheme();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const [creds, setCreds] = useState({ otp: '' });

    const handleChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(otpLogin(creds, navigate, showAlert))
    };

    return (
        <div className={`flex items-center justify-center min-h-screen bg-gray-100 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <div className={`verify-otp-container p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h2 className="text-2xl font-semibold text-center mb-4">Verify OTP</h2>
                <form onSubmit={handleSubmit} className="otp-form space-y-4">
                    <input
                        type="number"
                        name="otp"
                        value={creds.otp}
                        onChange={handleChange}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className={`otp-input w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                        required
                    />
                    <button type="submit" className={`otp-submit w-full py-2 rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white`} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTPLogin;

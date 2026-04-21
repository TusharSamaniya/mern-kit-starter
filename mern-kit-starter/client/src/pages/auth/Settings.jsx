import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';
import { deleteAccount, logout, updateSettings, changeemail, changePhone } from '../../redux/auth/authServices';
import Loader from '../../components/Loader';

const Settings = () => {
    const { user, message, loading, error } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false); // Controls the modal visibility
    const [password, setPassword] = useState(""); // Stores the entered password
    const [email, setEmail] = useState(user.email); // Stores the new email
    const [phone, setPhone] = useState(user.phone); // Stores the new phone number
    const { theme, toggleTheme } = useTheme();
    const [darkMode, setDarkMode] = useState(theme === 'dark');
    const [formData, setFormData] = useState({
        receiveNotification: user?.receiveNotification || false,
        receiveEmails: user?.receiveEmails || false,
        twoFactorAuth: user?.twoFactorAuth || false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleToggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
        toggleTheme();
    };

    const handleChange = async (e) => {
        const { name, checked } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: checked,
        };
        setFormData(updatedFormData);

        await dispatch(updateSettings(updatedFormData, navigate, showAlert));
    };

    const handleDeleteAccount = async () => {
        dispatch(deleteAccount({ password }, navigate, showAlert));
    };

    const handleLogout = () => {
        dispatch(logout(navigate, showAlert));
    };

    const handleUpdateEmail = async () => {
        await dispatch(changeemail({ email }, showAlert));
    };

    const handleUpdatePhone = async () => {
        await dispatch(changePhone({ phone }, showAlert));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div
            className={`py-20 items-center justify-center ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-800'
                }`}
        >
            <div
                className={`max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    }`}
            >
                <h1 className="text-3xl font-bold mb-8">Settings</h1>

                {/* Notification Preferences */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Notification Preferences</h2>
                    <div className="flex items-center justify-between mb-4">
                        <span>Enable Notifications</span>
                        <input
                            type="checkbox" changeemail
                            checked={formData.receiveNotification}
                            onChange={handleChange}
                            name="receiveNotification"
                            className="h-6 w-6"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <input
                            type="checkbox"
                            checked={formData.receiveEmails}
                            onChange={handleChange}
                            name="receiveEmails"
                            className="h-6 w-6"
                        />
                    </div>
                </section>

                {/* Theme Settings */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Theme</h2>
                    <div className="flex items-center justify-between">
                        <span>Dark Mode</span>
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={handleToggleDarkMode}
                            className="h-6 w-6"
                        />
                    </div>
                </section>

                {/* Privacy & Security */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
                    <div className="flex items-center justify-between mb-4">
                        <span>Enable Two-Factor Authentication (2FA)</span>
                        <input
                            type="checkbox"
                            checked={formData.twoFactorAuth}
                            onChange={handleChange}
                            className="h-6 w-6"
                            name="twoFactorAuth"
                        />
                    </div>
                </section>

                {/* Change Email */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Enter new email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`p-2 border rounded ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
                        />
                        <button
                            onClick={handleUpdateEmail}
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Update Email
                        </button>
                    </div>
                </section>

                {/* Change Phone */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Change Phone</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="tel"
                            placeholder="Enter new phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`p-2 border rounded ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
                        />
                        <button
                            onClick={handleUpdatePhone}
                            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Update Phone
                        </button>
                    </div>
                </section>

                {/* Account Actions */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Account Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={handleLogout}
                            className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-200"
                        >
                            Logout
                        </button>

                        <div>
                            {/* Delete Account Button */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Delete Account
                            </button>

                            {/* Modal */}
                            {showModal && (
                                <div className={`fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                    <div className={`p-6 rounded-lg shadow-lg w-80  ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                        <h2 className="text-lg font-bold mb-4">Confirm Delete Account</h2>
                                        <p className="text-sm mb-4">
                                            Please enter your password to confirm the deletion of your account.
                                        </p>

                                        {/* Password Input */}
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full p-2 border rounded mb-4  ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
                                        />
                                        {/* Action Buttons */}
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => setShowModal(false)}
                                                className="py-2 px-4 rounded bg-gray-600 hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleDeleteAccount}
                                                className={`py-2 px-4 rounded text-white bg-red-500 hover:bg-red-600`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;

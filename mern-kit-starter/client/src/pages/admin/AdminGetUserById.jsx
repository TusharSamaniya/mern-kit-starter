import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAlert } from '../../contexts/AlertContext';
import { useDispatch, useSelector } from 'react-redux';
import { adminDeleteUser, adminUpdateUser, getUserById } from '../../redux/admin/adminServices';
import Loader from '../../components/Loader.jsx'

const AdminGetUserById = () => {
    const { id } = useParams();
    const { loading, user, error, message } = useSelector(state => state.admin);
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        receiveEmails: false,
        verifiedUser: false,
        receiveNotification: false,
        twoFactorAuth: false,
        isBlocked: false
    });

    useEffect(() => {
        dispatch(getUserById(id, showAlert));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({
                id: user._id,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                receiveEmails: user.receiveEmails || false,
                verifiedUser: user.verifiedUser || false,
                receiveNotification: user.receiveNotification || false,
                twoFactorAuth: user.twoFactorAuth || false,
                isBlocked: user.isBlocked || false
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(adminUpdateUser(formData, showAlert))
    };

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        dispatch(adminDeleteUser(user._id ,navigate, showAlert))
    };

    if (loading) {
        return <Loader />;
    }

    return (

        <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h1 className="text-4xl font-bold mb-6 text-centerFf">User Details</h1>
                {user && (
                    <form onSubmit={handleSubmit}>
                        {/* General Information */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">General Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-lg font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                                        placeholder="User's Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                                        placeholder="User's Email Address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                                        placeholder="User's Phone Number"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Notification Settings */}
                        <section>
                            <h2 className="text-2xl font-semibold my-4">Notification Settings</h2>
                            <div className="flex items-center justify-between">
                                <label className="text-lg font-medium">Receive Emails</label>
                                <input
                                    type="checkbox"
                                    name="receiveEmails"
                                    checked={formData.receiveEmails}
                                    onChange={handleChange}
                                    className="h-6 w-6"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-lg font-medium">Receive Notifications</label>
                                <input
                                    type="checkbox"
                                    name="receiveNotification"
                                    checked={formData.receiveNotification}
                                    onChange={handleChange}
                                    className="h-6 w-6"
                                />
                            </div>
                        </section>

                        {/* Security Settings */}
                        <section>
                            <h2 className="text-2xl font-semibold my-4">Security Settings</h2>
                            <div className="flex items-center justify-between">
                                <label className="text-lg font-medium">Is Verified</label>
                                <input
                                    type="checkbox"
                                    name="verifiedUser"
                                    checked={formData.verifiedUser}
                                    onChange={handleChange}
                                    className="h-6 w-6"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-lg font-medium">Two-Factor Authentication</label>
                                <input
                                    type="checkbox"
                                    name="twoFactorAuth"
                                    checked={formData.twoFactorAuth}
                                    onChange={handleChange}
                                    className="h-6 w-6"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-lg font-medium">Block User</label>
                                <input
                                    type="checkbox"
                                    name="isBlocked"
                                    checked={formData.isBlocked}
                                    onChange={handleChange}
                                    className="h-6 w-6"
                                />
                            </div>
                        </section>

                        <div className="flex justify-end space-x-4 mt-5">
                            <button
                                type="button"
                                onClick={() => navigate('/getAllUsers')}
                                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteUser} // This function should handle the delete action
                                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Delete User
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminGetUserById;

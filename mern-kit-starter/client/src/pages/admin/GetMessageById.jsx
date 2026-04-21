import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { getMessageById, replyMessage } from '../../redux/admin/adminServices'; // Import the reply action
import { useAlert } from '../../contexts/AlertContext';

const GetMessageById = () => {
    const { theme } = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, messageById } = useSelector(state => state.admin);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        id: id,
        repliedMessage: ''
    });

    useEffect(() => {
        dispatch(getMessageById(id, navigate, showAlert));
    }, []);

    const handleBackClick = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleReplySubmit = () => {
        dispatch(replyMessage(id, formData, navigate, showAlert))
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };

    return (
        <div className={`min-h-screen flex items-start justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className={`w-full max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h2 className="text-2xl font-bold mb-5">Message Details</h2>
                {loading ? (
                    <p>Loading message details...</p>
                ) : messageById ? (
                    <div>
                        <p><strong>Name:</strong> {messageById.name}</p>
                        <p><strong>Email:</strong> {messageById.email}</p>
                        <p><strong>Date:</strong> {formatDate(messageById.createdAt)}</p>
                        <p><strong>Content:</strong> {messageById.message}</p>
                        <p><strong>Status:</strong> {messageById.status}</p>
                        <p><strong>Replied By:</strong> {messageById.repliedBY?.email}</p>
                        <p><strong>Reply Content:</strong> {messageById.repliedMessage}</p>

                        {/* Reply Section */}
                        <div className="mt-5">
                            <textarea
                                value={formData.repliedMessage}
                                onChange={handleChange}
                                placeholder="Write your reply here..."
                                rows="4"
                                name='repliedMessage'
                                className={`w-full p-3 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                            />
                            <button
                                onClick={handleReplySubmit}
                                className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-200"
                            >
                                Send Reply
                            </button>
                        </div>

                        {/* Back Button */}
                        <button
                            className="mt-5 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-200"
                            onClick={handleBackClick}
                        >
                            Back
                        </button>
                    </div>
                ) : (
                    <p>No message found.</p>
                )}
            </div>
        </div>
    );
};

export default GetMessageById;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../contexts/ThemeContext';
import { getAllMessages } from '../../redux/admin/adminServices';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';

const GetAllMessages = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { loading, allMessages } = useSelector(state => state.admin);
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    // State for filters
    const [filter, setFilter] = useState({
        replied: 'all', // 'all', 'yes', 'no'
        date: 'new', // 'new', 'old'
    });

    useEffect(() => {
        dispatch(getAllMessages(navigate, showAlert));
    }, []);

    const handleGetMessageById = (id) => {
        navigate(`/message/${id}`);
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

    // Filter logic
    const filteredMessages = allMessages.filter((message) => {
        if (filter.replied === 'all') {
            return true; // Include all messages
        }
        if (filter.replied === 'yes') {
            return message.status === 'Replied'; // Include only replied messages
        }
        if (filter.replied === 'no') {
            return message.status === 'Not replied'; // Include only not replied messages
        }
        return false; // Fallback, exclude if none match
    });

    const sortedMessages = filteredMessages.sort((a, b) => {
        return filter.date === 'new'
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt);
    });

    return (
        <div className={`min-h-screen flex items-start justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className={`w-full max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h2 className="text-2xl font-bold mb-5">All Messages</h2>

                {/* Filter Options */}
                <div className="mb-5 flex space-x-4">
                    {/* Replied Filter */}
                    <div>
                        <label htmlFor="replied" className="block text-sm font-medium">Replied</label>
                        <select
                            id="replied"
                            className={`mt-1 block w-full rounded-md shadow-sm ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            value={filter.replied}
                            onChange={(e) => setFilter({ ...filter, replied: e.target.value })}
                        >
                            <option value="all">All</option>
                            <option value="yes">Replied</option>
                            <option value="no">Not Replied</option>
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium">Sort by Date</label>
                        <select
                            id="date"
                            className={`mt-1 block w-full rounded-md shadow-sm ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            value={filter.date}
                            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                        >
                            <option value="new">Newest First</option>
                            <option value="old">Oldest First</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <p>Loading messages...</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} text-left`}>
                                <th className="p-3 border-b">Name</th>
                                <th className="p-3 border-b">Email</th>
                                <th className="p-3 border-b">Date</th>
                                <th className="p-3 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMessages.map((message) => (
                                <tr key={message._id} onClick={() => handleGetMessageById(message._id)} className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-3">{message.name}</td>
                                    <td className="p-3">{message.email}</td>
                                    <td className="p-3">{formatDate(message.createdAt)}</td>
                                    <td className="p-3">{message.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default GetAllMessages;

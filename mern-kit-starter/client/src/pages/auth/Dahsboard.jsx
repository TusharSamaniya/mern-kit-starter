import React from 'react';

import { useTheme } from '../../contexts/ThemeContext';
import { useSelector } from 'react-redux';

const Dahsboard = () => {
    const { theme } = useTheme()
    const { user } = useSelector((state) => state.auth)
    const users = [
        { id: 1, name: "John Doe", email: "johndoe@example.com", dob: "1995-06-15" },
        { id: 2, name: "Jane Smith", email: "janesmith@example.com", dob: "1998-03-22" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", dob: "1992-11-08" },
        { id: 4, name: "Bob Brown", email: "bob@example.com", dob: "1990-05-30" },
        { id: 5, name: "Charlie Davis", email: "charlie@example.com", dob: "1993-07-21" },
        { id: 6, name: "Diana Evans", email: "diana@example.com", dob: "1997-09-14" },
        { id: 7, name: "Ethan Foster", email: "ethan@example.com", dob: "1991-12-19" },
        { id: 8, name: "Fiona Green", email: "fiona@example.com", dob: "1994-06-03" },
        { id: 9, name: "George Harris", email: "george@example.com", dob: "1996-02-10" },
        { id: 10, name: "Hannah Lee", email: "hannah@example.com", dob: "1999-04-25" },
        { id: 11, name: "Ian Miller", email: "ian@example.com", dob: "1990-08-12" },
        { id: 12, name: "Julia Nelson", email: "julia@example.com", dob: "1995-03-05" }
    ];

    return (
        <div className={`flex-1 py-2 h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-700'}`}>
            <h2
                className="lg:text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"
            >
                Welcome User ! {user.name}
            </h2>
            <hr />
            <main className="py-10 text-center">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">User Data Table</h2>
                    <table className="w-full border border-collapse border-gray-300">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Date of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.dob}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>



        </div>
    );
};

export default Dahsboard;

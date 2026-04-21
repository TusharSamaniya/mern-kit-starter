import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';


const AdminLayout = () => {

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header component */}
            <AdminNavbar />

            {/* Main content area */}
            <div className="flex-1 overflow-y-auto transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

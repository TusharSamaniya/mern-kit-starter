// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar'; // Import Navbar
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            <Navbar /> {/* This will be rendered on all non-excluded pages */}
            <main>
                <Outlet /> {/* This will render the current page's content */}
            </main>
            <Footer />
        </>
    );
};

export default Layout;

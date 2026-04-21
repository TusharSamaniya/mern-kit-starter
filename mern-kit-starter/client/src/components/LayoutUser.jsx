import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './NavbarUser.jsx';
import Footer from './Footer.jsx';
import { useTheme } from '../contexts/ThemeContext';

const LayoutUser = () => {
    const { theme } = useTheme();

    return (
        <>
            {/* Header component */}
            <Header />

            {/* Main content area */}
            <main>
                <Outlet />
            </main>

            {/* Footer component */}
            <Footer />
        </>
    );
};

export default LayoutUser;

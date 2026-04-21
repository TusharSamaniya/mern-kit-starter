import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo or Brand Name */}
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold">Address Management</h1>
                        <p className="text-gray-400 text-sm">manage your address effortlessly</p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 text-sm">
                        <Link to="/" className="hover:underline text-gray-300">
                            Home
                        </Link>
                        <Link to="/support" className="hover:underline text-gray-300">
                            Contact
                        </Link>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link
                            to="https://twitter.com"
                            className="hover:text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link
                            to="https://facebook.com"
                            className="hover:text-blue-600"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook"></i>
                        </Link>
                        <Link
                            to="https://linkedin.com"
                            className="hover:text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link
                            to="https://github.com"
                            className="hover:text-gray-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github"></i>
                        </Link>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-6 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Address Management. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

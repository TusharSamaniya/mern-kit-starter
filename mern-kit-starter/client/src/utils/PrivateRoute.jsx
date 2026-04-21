import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/auth/authServices';
import { useAlert } from '../contexts/AlertContext';
import Loader from '../components/Loader';

// Component to handle private routes
const PrivateRoute = ({ element: Element }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const checkUser = async () => {
            await dispatch(getUser(navigate, showAlert));
            setLoading(false);
        };
        checkUser();
    }, [dispatch, navigate]);

    if (loading) {
        return <div><Loader /></div>;
    }

    // If authenticated, render the protected component, otherwise redirect to login
    return isAuthenticated ? Element : <Navigate to="/login" replace />;
};

export default PrivateRoute;

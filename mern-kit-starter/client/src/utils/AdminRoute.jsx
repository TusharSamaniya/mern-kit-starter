import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from '../contexts/AlertContext';
import Loader from '../components/Loader';
import { getAdmin } from '../redux/admin/adminServices';

// Component to handle private routes
const AdminRoute = ({ element: Element }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);

    useEffect(() => {
        const checkUser = async () => {
            await dispatch(getAdmin(navigate, showAlert));
            setLoading(false);
        };
        checkUser();
    }, [dispatch, navigate]);

    if (loading) {
        return <div><Loader /></div>;
    }

    // If authenticated, render the protected component, otherwise redirect to login
    return isAuthenticated ? Element : <Navigate to="/adminLogin" replace />;
};

export default AdminRoute;

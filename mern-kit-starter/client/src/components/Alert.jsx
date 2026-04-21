import React from 'react';
import { useAlert } from '../contexts/AlertContext';


const Alert = () => {
    const { alert } = useAlert();

    if (!alert) return null;

    return (
        <div className={`alert alert-${alert.type} fixed  top-16 left-8 bg-gray-200 p-3 rounded text-bold z-50`}>
            {alert.message}
        </div>
    );
};

export default Alert;

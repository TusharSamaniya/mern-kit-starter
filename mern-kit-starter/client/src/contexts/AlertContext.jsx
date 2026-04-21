import { createContext, useContext, useState } from "react";

// create a alertcontext and store in a variable
const AlertContext = createContext();

// create a alert provider component
export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null)

    const showAlert = (message, type = 'info', duration = 3000) => {
        setAlert({ message, type });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    return (
        < AlertContext.Provider value={{ alert, showAlert }} >
            {children}
        </ AlertContext.Provider >
    );
}

// Custom hook to use the AlertContext
export const useAlert = () => {
    return useContext(AlertContext);
};
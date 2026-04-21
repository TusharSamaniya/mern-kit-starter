import React, { createContext, useContext, useState } from "react";

// create a theme context
const ThemeContext = createContext();

// create a theme provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Custom hook to use the ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};

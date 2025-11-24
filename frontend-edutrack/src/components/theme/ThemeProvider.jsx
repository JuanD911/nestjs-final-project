import React, { createContext, useState, useContext, useEffect } from "react"; 
import { ThemeContext } from "./ThemeContext"; 

export const useTheme = () => useContext(ThemeContext); 

export function ThemeProvider({children}){
    const [theme, setTheme] = useState('light');

    const alterTheme = () => {
        setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
    }
    
    useEffect(() => {
        const rootElement = document.documentElement;
        
        rootElement.className = ''; 
        rootElement.classList.add(`${theme}-theme`);

        localStorage.setItem('theme', theme); 

    }, [theme]);

    const contextValue = {
        theme,
        alterTheme,
    }

    return(
        <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
    )
}
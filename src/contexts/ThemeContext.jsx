import React, { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // handle theme 
    const [theme, setTheme] = useState("");
    const [mainTheme, setMainTheme] = useState("");
    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        setTheme(theme);
    }, [])

    useEffect(() => {
        if (!theme) return;

        if (theme === "light") {
            document.documentElement.removeAttribute("data-theme")
            localStorage.setItem("theme", "light")
            setMainTheme("light")
        } else if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("theme", "dark")
            setMainTheme("dark")
        } else if (theme === "system") {
            const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
            if (darkThemeMq.matches) {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark")
                setMainTheme("dark")
            } else {
                document.documentElement.removeAttribute("data-theme")
                localStorage.removeItem("theme", "light")
                setMainTheme("light")
            }
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, mainTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;

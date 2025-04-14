import React, { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // handle theme 
    const [theme, setTheme] = useState("");
    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        setTheme(theme);
    }, [])

    useEffect(() => {
        if (!theme) return;

        if (theme === "light") {
            document.documentElement.removeAttribute("data-theme")
            localStorage.setItem("theme", "light")
        } else if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("theme", "dark")
        } else if (theme === "system") {
            const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
            if (darkThemeMq.matches) {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark")
            } else {
                document.documentElement.removeAttribute("data-theme")
                localStorage.removeItem("theme", "light")
            }
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;

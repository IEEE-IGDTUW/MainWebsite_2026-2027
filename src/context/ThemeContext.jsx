import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ThemeContext = createContext({
    theme: "light",
    toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem("theme");

            if (savedTheme === "light" || savedTheme === "dark") {
                return savedTheme;
            }
        } catch {
            // localStorage may be unavailable
        }

        if (
            typeof document !== "undefined" &&
            document.documentElement.classList.contains("dark")
        ) {
            return "dark";
        }

        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.add("dark");

        try {
            localStorage.setItem("theme", theme);
        } catch {
            // Theme still works without localStorage
        }
    }, [theme]);

    const toggle = () => {
        setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark"
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}
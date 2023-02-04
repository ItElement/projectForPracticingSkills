import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "./ThemeContext";

// Явное приведение через as к типу Theme, тк возвращаем строку и ругается ts
// если localStorage пустой, то ставим светлую тему
const  defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

const ThemeProvider: FC = ({children}) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)


    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme,
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
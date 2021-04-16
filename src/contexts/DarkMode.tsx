import {createContext, useState} from "react";

// TODO: Get this setting from the browser, then set it as default
export const DarkModeCtx = createContext<{isOn: boolean, toggle: () => void}>({
    isOn: false,
    toggle: () => {}
});

export const DarkModeProvider = ({children}: {children: JSX.Element}) => {

    // check user's browser preferences for dark mode
    const matches = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isOn, setIsOn] = useState(matches);

    const toggle = () => {
        if (isOn) {
            setIsOn(false);
        } else {
            setIsOn(true);
        }
    }

    return (
        <DarkModeCtx.Provider value={{isOn, toggle}}>{children}</DarkModeCtx.Provider>
    );
}
import {createContext, useState} from "react";

// TODO: Get this setting from the browser, then set it as default
export const DarkModeCtx = createContext<{ isOn: boolean, toggle: () => void}>({
    isOn: false,
    toggle: () => {}
});

export const DarkModeProvider = ({children}: { children: JSX.Element }) => {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => setIsOn(!isOn);

    return (
        <DarkModeCtx.Provider value={{isOn, toggle}}>{children}</DarkModeCtx.Provider>
    );
}
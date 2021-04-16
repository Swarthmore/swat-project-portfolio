import * as React from "react";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles";
import {blue, deepPurple, lightBlue, red} from "@material-ui/core/colors";
import {useContext} from "react";
import {DarkModeCtx} from "./contexts/DarkMode";

const makeTheme = (isOn: boolean) => {
    return createMuiTheme(
        !isOn ? {
            palette: {
                type: "light", primary: red, secondary: blue,
            }
        } : {
            palette: {
                type: "dark", primary: deepPurple, secondary: lightBlue
            }
        }
    );
}

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
    const {isOn} = useContext(DarkModeCtx);
    return (
        <MuiThemeProvider theme={makeTheme(isOn)}>
            {children}
        </MuiThemeProvider>
    );
}
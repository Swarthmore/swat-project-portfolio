import {createMuiTheme, colors, useMediaQuery} from "@material-ui/core";
const { blue } = colors;

export default function makeTheme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: {
        main: prefersDarkMode ? "rgb(50, 0, 0)" : "rgb(99, 25, 25)",
      },
      secondary: {
        main: prefersDarkMode ? blue["900"] : blue["500"],
      },
    },
  })
}
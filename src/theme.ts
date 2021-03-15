import { createMuiTheme, colors } from "@material-ui/core";
const { blue } = colors;

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(99, 25, 25)",
    },
    secondary: {
      main: blue["500"],
    },
  },
});

export { MuiTheme };

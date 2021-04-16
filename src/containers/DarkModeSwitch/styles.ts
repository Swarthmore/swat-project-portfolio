import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    on: {
        fontWeight: "bold",
        color: "#ffffff"
    },
    off: {
        fontWeight: "lighter",
        color: "#dedede"
    }
}));
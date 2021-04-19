import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    title: {
        flexGrow: 1,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline"
        }
    }
}));
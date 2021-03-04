import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    }
}));
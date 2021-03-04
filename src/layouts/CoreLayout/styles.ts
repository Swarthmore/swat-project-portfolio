import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    content: {
        display: "flex",
        flexGrow: 1
    },
    children: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    }
}));

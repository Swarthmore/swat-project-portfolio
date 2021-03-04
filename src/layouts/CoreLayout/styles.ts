import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    content: {
        display: "flex",
        flexGrow: 1,
        background: theme.palette.background.paper
    },
    children: {
        flexGrow: 1,
        padding: theme.spacing(4)
    }
}));

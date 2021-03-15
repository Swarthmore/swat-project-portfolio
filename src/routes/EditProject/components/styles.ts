import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
    root: {
        maxWidth: "500px",
        flexGrow: 1
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    field: {
        marginTop: theme.spacing(1)
    },
    mdButton: {
        transition: "all 0.2s ease",
        marginTop: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(1)
    },
    preview: {
        border: "1px dashed #ccc",
        boxSizing: "border-box",
        padding: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    updates: {
        marginTop: theme.spacing(2)
    }
}));

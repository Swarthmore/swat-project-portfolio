import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    card: {
        marginBottom: theme.spacing(3)
    },
    update: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    markdown: {
        border: "1px dashed #ccc",
        boxSizing: "border-box",
        padding: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    skeleton: {
        flexGrow: 1,
        height: 300
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    subtitle: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    section: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    }
}));

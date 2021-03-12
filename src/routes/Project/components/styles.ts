import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
    root: {
        flexGrow: 1
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
    }
}));

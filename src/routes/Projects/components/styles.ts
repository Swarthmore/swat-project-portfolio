import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    row: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    cardGrid: {
        display: "flex",
        flexDirection: "row"
    },
    gridItem: {
        display: "flex",
        flexGrow: 1
    }
}));

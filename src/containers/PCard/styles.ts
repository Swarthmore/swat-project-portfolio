import { makeStyles } from "@material-ui/core"

export default makeStyles((theme)=> ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        width: "100%"
    },
    actions: {
        display: "flex",
        background: theme.palette.background.paper,
    },
    content: {
        flexGrow: 1
    },
    updateDate: {
        flexGrow: 1
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

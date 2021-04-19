import {Box, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: (theme.palette.type === "dark") ? "black" : "white",
        maxWidth: "100%"
    }
}));

export default function PCardUpdateLabel({ msg, ...rest }: { msg: string }) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            {msg}
        </Box>
    );
}
import {makeStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme)=> ({
    root: {
        width: "100%",
        textAlign: "right",
        color: theme.palette.text.secondary
    }
}));
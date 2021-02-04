/**
 * @description
 * 
 * This file exports a hook that will provide classes for the LoginCard component.
 * 
 */
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "400px",
        background: theme.palette.background.paper
    }
}))
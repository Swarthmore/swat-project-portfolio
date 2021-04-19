import {useStyles} from "./styles";

export default function Indicator() {
    const classes = useStyles();
    return <div className={classes.root}>&#9679;</div>
}
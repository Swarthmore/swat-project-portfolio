import {Switch} from "@material-ui/core";
import {useContext} from "react";
import {DarkModeCtx} from "../../contexts/DarkMode";
import {
    Brightness2,
    Brightness7
} from "@material-ui/icons";
import makeStyles from "./styles";

export default function DarkModeSwitch() {

    const classes = makeStyles();
    const {isOn, toggle} = useContext(DarkModeCtx);

    return (
        <div className={classes.root}>
            <span className={isOn ? classes.off : classes.on }>Light</span>
            <Switch
                checked={isOn}
                onChange={toggle}
                icon={<Brightness7/>}
                checkedIcon={<Brightness2/>}
            />
            <span className={isOn ? classes.on : classes.off}>Dark</span>
        </div>
    );
}
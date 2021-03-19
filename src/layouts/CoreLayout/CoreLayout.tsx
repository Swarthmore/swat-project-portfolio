import React from "react";
import styles from "./styles";
import Props from "./props";
import Navbar from "../../containers/Navbar";
import LoginCard from "../../containers/LoginCard";
import SideMenu from "../../containers/SideMenu";
import useUid from "../../hooks/useUid";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import useSnax from "../../hooks/useSnax";

export default function CoreLayout({ children }: Props) {

    const classes = styles();
    const { uid } = useUid();

    const { snack, setSnack } = useSnax();

    const closeSnack = () => setSnack({ open: false, msg: "", type: "" });

    return (
        <div className={classes.root}>
            {!uid && <LoginCard />}
            <Navbar />
            <div className={classes.content}>
                <SideMenu />
                <div className={classes.children}>{children}</div>
            </div>
            {snack.open && <Snackbar open={snack.open} autoHideDuration={5000} onClose={() => closeSnack()}>
                <Alert elevation={6} variant="filled" severity={snack.type}
                       onClose={() => closeSnack()}>{snack.msg}</Alert>
            </Snackbar>}
        </div>
    );

}
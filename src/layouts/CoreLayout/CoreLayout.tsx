import React from "react";
import styles from "./styles";
import Props from "./props";
import Navbar from "../../containers/Navbar";
import LoginCard from "../../containers/LoginCard";
import SideMenu from "../../containers/SideMenu";
import useUid from "../../hooks/useUid";

export default function CoreLayout({ children }: Props) {

    const classes = styles();

    const { uid } = useUid();

    return (
        <div className={classes.root}>
            {!uid && <LoginCard />}
            <Navbar />
            <div className={classes.content}>
                <SideMenu />
                <div className={classes.children}>{children}</div>
            </div>
        </div>
    );

}
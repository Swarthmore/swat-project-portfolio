import React from "react";
import styles from "./styles";
import Props from "./props";
import Navbar from "../../containers/Navbar";
import LoginCard from "../../containers/LoginCard";
import { useSelector } from "react-redux";
import { isEmpty } from "react-redux-firebase";
import SideMenu from "../../containers/SideMenu";

export default function CoreLayout({ children }: Props) {

    const classes = styles();

    const auth = useSelector((state: any) => state.firebase.auth)

    return (
        <div className={classes.root}>
            {isEmpty(auth) && <LoginCard />}
            <Navbar />
            <div className={classes.content}>
                <SideMenu />
                <div className={classes.children}>{children}</div>
            </div>
        </div>
    );

}
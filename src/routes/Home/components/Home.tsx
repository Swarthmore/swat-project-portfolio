import React from "react";
import styles from "./styles";
import { useHistory } from "react-router-dom";


export default function Home() {

    const classes = styles();
    const history = useHistory();

    history.push("projects/by-team/all");

    return (
        <div className={classes.root}>
            <p>Home page</p>
        </div>
    );

}
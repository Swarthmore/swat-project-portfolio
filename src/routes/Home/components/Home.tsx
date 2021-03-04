import * as React from "react";
import styles from "./styles";

export default function Home() {

    const classes = styles();

    return (
        <div className={classes.root}>
            <p>Home page</p>
        </div>
    );

}
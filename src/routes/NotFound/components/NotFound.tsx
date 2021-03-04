import * as React from "react";
import styles from "./styles"

export default function NotFoundPage() {

    const classes = styles();

    return (
        <div className={classes.root}>
            <p>404</p>
        </div>
    );

}

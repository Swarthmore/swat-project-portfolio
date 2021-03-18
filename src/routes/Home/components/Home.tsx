import React from "react";
import styles from "./styles";
import { useHistory } from "react-router-dom";


export default function Home() {

    const classes = styles();
    const history = useHistory();

    React.useEffect(() => history.push("projects/by-team/all"), []);
    return <></>

}
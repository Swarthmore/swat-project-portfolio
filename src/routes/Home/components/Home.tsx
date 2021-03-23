import React from "react";
import styles from "./styles";
import { Redirect } from "react-router-dom";
import useUid from "../../../hooks/useUid";

export default function Home() {

    const classes = styles();
    const { uid } = useUid();


    return uid ? <Redirect to="projects/by-team/all" /> : <div>Login to view projects</div>

}
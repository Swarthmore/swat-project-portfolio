import React from "react";
import { Project } from "../../../types";
import { Typography } from "@material-ui/core";
import styles from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
import ReactMarkdown from "react-markdown";

export default function ProjectPage() {

    const classes = styles();
    const history = useHistory();

    const params: { projectId: string } = useParams();

    // if there is no project id provided, redirect the user to the home page
    if (!params.projectId) {
        history.push("/");
    }

    const populates = [{ child: "meta.createdBy", root: "users" }];
    const collection = "projects";
    const doc = params.projectId;

    useFirestoreConnect([ 
        { collection, populates, doc }
    ])

    let project = useSelector((state: any) => populate(state.firestore, "projects", populates));

    // Show message while project is loading
    if (!isLoaded(project)) {
        return <div>Loading...</div>
    }

    // Show message if there is no project 
    if (isEmpty(project)) {
        return <div>Project is empty</div>
    }

    // convert the project to an array
    [project] = Object.keys(project).map((key: string) => ({ id: key, ...project[key] }));

    return (
        <div className={classes.root}>
            <Typography variant="h2">{project.name}</Typography>
            <Typography variant="subtitle1">Started on {project.meta.createdOn}</Typography>
            <Typography variant="subtitle2">{project.description}</Typography>
            {project.markdown && <ReactMarkdown>{project.markdown}</ReactMarkdown>}
        </div>
    );

}
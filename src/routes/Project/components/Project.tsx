import React from "react";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import styles from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, populate, isLoaded, isEmpty, useFirestore } from "react-redux-firebase";
import ReactMarkdown from "react-markdown";
import PostUpdate from "../../../containers/StatusUpdate/StatusUpdate";
import firebase from "firebase";

export default function ProjectPage() {

    const classes = styles();
    const history = useHistory();

    const firestore = useFirestore();
    const auth = useSelector((state: any) => state.firebase.auth);

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

    const isOwner = project.meta.ownedBy === auth?.uid;

    const onSubmit = async (value: string) => {
        const update = {
            value: value,
            createdOn: Date.now().toString(),
            createdBy: auth.uid
        }
        await firestore.update(`projects/${project.id}`, { updates:  firebase.firestore.FieldValue.arrayUnion(update) });
    }
    
    return (
        <div className={classes.root}>
            {isOwner && <PostUpdate onSubmit={onSubmit} />}
            <Card>
                <CardContent>
                    <Typography variant="h2">{project.name}</Typography>
                    <Typography variant="subtitle1">Started on {project.meta.createdOn}</Typography>
                    <Typography variant="subtitle2">{project.description}</Typography>
                    {project.markdown && <ReactMarkdown>{project.markdown}</ReactMarkdown>}
                    {project.updates.map((update: any) => <div key={update.value}>{update.value}</div>)}
                </CardContent>
            </Card>
        </div>
    );

}
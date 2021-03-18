import React from "react";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import styles from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, populate, isLoaded, isEmpty, useFirestore } from "react-redux-firebase";
import ReactMarkdown from "react-markdown";
import PostUpdate from "../../../containers/StatusUpdate/StatusUpdate";
import firebase from "firebase";
import { dateString } from "../../../utils";
import {Project} from "../../../types";
import {RootState} from "../../../store/reducer";

export default function ProjectPage() {

    const classes = styles();
    const history = useHistory();

    const firestore = useFirestore();
    const auth = useSelector((state: any) => state.firebase.auth);

    const params: { id: string } = useParams();

    // if there is no project id provided, redirect the user to the home page
    if (!params.id) {
        history.push("/");
    }

    const populates = [{ child: "meta.createdBy", root: "users" }];
    const collection = "projects";
    const doc = params.id;

    useFirestoreConnect([ 
        { collection, populates, doc }
    ])

    const projects = useSelector((state: RootState) => populate(state.firestore, "projects", populates));

    // Show message while project is loading
    if (!isLoaded(projects)) {
        return <div>Loading...</div>
    }

    // Show message if there is no project 
    if (isEmpty(projects)) {
        return <div>Project is empty</div>
    }

    const project: Project = {
        id: params.id,
        ...projects[params.id]
    }

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

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h2">{project.name}</Typography>
                    <Typography variant="subtitle1">Started on {dateString(project.meta.createdOn)}</Typography>
                    <Typography variant="subtitle2">{project.description}</Typography>
                    {project.markdown && <ReactMarkdown>{project.markdown}</ReactMarkdown>}
                </CardContent>
            </Card>


            {project.updates && project.updates.length > 0 && <Typography variant="h4">Updates</Typography>}
            {project.updates && project.updates.map((update: any, i: number) => (
                <Card key={i} className={classes.update}>
                    <CardContent>
                        <Typography variant="subtitle1">{dateString(update.createdOn)}</Typography>
                        <Typography>{update.value}</Typography>
                    </CardContent>
                </Card>
            ))}


        </div>
    );

}
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
import useUid from "../../../hooks/useUid";
import useSnax from "../../../hooks/useSnax";

export default function ProjectPage() {

    const classes = styles();
    const history = useHistory();
    const firestore = useFirestore();
    const {uid} = useUid();
    const {id}: { id: string } = useParams();
    const {setSnack} = useSnax();

    // if there is no project id provided, redirect the user to the home page
    if (!id) {
        history.push("/");
    }

    //const populates = [{ child: "meta.createdBy", root: "users" }];
    const collection = "projects";
    const doc = id;

    useFirestoreConnect([ 
        { collection, doc }
    ])

    const project = useSelector((state: RootState) => state.firestore.ordered.projects);

    // Show message while project is loading
    if (!isLoaded(project)) {
        return <div>Loading...</div>
    }

    // Show message if there is no project 
    if (isEmpty(project)) {
        return <div>Project is empty</div>
    }

    const first = project[0];

    if (!first) {
        setSnack({ msg: "Project not found!", type: "error", open: true });
    }

    const isOwner = first.meta.ownedBy === uid;

    const onSubmit = async (value: string) => {
        try {
            const update = {
                value: value,
                createdOn: Date.now().toString(),
                createdBy: uid
            }
            await firestore.update(`projects/${first.id}`, { updates:  firebase.firestore.FieldValue.arrayUnion(update) });
            setSnack({ msg: "Status update posted", type: "success", open: true });
        } catch(error) {
            setSnack({ msg: error.toString(), type: "error", open: true });
        }
    }
    
    return (
        <div className={classes.root}>
            {isOwner && <PostUpdate onSubmit={onSubmit} />}

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h2">{first.name}</Typography>
                    <Typography variant="subtitle1">Started on {dateString(first.meta.createdOn)}</Typography>
                    <Typography variant="subtitle2">{first.description}</Typography>
                    {first.markdown && <ReactMarkdown>{first.markdown}</ReactMarkdown>}
                </CardContent>
            </Card>


            {first.updates && first.updates.length > 0 && <Typography variant="h4">Updates</Typography>}
            {first.updates && first.updates.map((update: any, i: number) => (
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
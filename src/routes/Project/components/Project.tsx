import React from "react";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import styles from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, populate, isLoaded, isEmpty, useFirestore } from "react-redux-firebase";
import MD from "react-markdown";
import gfm from "remark-gfm"
import PostUpdate from "../../../containers/StatusUpdate/StatusUpdate";
import firebase from "firebase";
import {dateString, sortUpdates} from "../../../utils";
import {Project} from "../../../types";
import {RootState} from "../../../store/reducer";
import useUid from "../../../hooks/useUid";
import useSnax from "../../../hooks/useSnax";
import {Skeleton} from "@material-ui/lab";
import {Image} from "@material-ui/icons";

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

            <Typography variant="h1" align="center" className={classes.title}>{first.name}</Typography>
            <Typography variant="subtitle1" align="center">Started on {dateString(first.meta.createdOn)}</Typography>
            <Typography variant="subtitle1" align="center">{first.description}</Typography>

            {isOwner && <PostUpdate onSubmit={onSubmit} />}

            {first.updates && first.updates.length > 0 && <Typography variant="h2" align="center" className={classes.subtitle}>Project Updates</Typography>}

            {first.updates && sortUpdates(first.updates).map((update: any, i: number) => (
                <div key={i} className={classes.update}>
                    <Typography variant="subtitle1">{dateString(update.createdOn)}</Typography>
                    <Typography>{update.value}</Typography>
                </div>
            ))}

            {first.markdown && <Typography variant="h2" align="center" className={classes.subtitle}>About This Project</Typography>}
            {first.markdown && <MD plugins={[gfm]}>{first.markdown}</MD>}

        </div>
    );

}
import React from "react";
import styles from "./styles"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
import ProjectCard from "../../../containers/ProjectCard/ProjectCard";
import { Typography } from "@material-ui/core";

export default function UserPage() {

    const classes = styles();

    const params: { userId: string } = useParams();

    const collection = "projects";
    const populates = [{ child: "meta.createdBy", root: "users" }]; 

    useFirestoreConnect([
        {
            collection,
            populates,
            where: ["meta.createdBy", "==", params.userId]
        }
    ])

    const projects = useSelector((state: any) => populate(state.firestore, "projects", populates));

    if (!isLoaded(projects)) {
        return <div>Loading...</div>
    }

    if (isEmpty(projects)) {
        return <div>User has no projects</div>
    }

    console.log(
        projects[Object.keys(projects)[0]]
    )

    return (
        <div className={classes.root}>
            <Typography variant="h3">Projects by {projects[Object.keys(projects)[0]].meta.createdBy.displayName}</Typography>
            {Object.keys(projects).map((key: string) => 
                <div className={classes.row} key={key}>
                    <ProjectCard project={projects[key]} />
                </div>
            )}
        </div>
    );

}

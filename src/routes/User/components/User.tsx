import React from "react";
import styles from "./styles"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
import ProjectCard from "../../../containers/ProjectCard/ProjectCard";

export default function UserPage() {

    const classes = styles();

    const params: { userId: string } = useParams();

    const collection = "projects";

    useFirestoreConnect([
        {
            collection,
            where: ["meta.createdBy", "==", params.userId]
        }
    ])

    const projects = useSelector((state: any) => state.firestore.ordered.projects);

    if (!isLoaded(projects)) {
        return <div>Loading...</div>
    }

    if (isEmpty(projects)) {
        return <div>User has no projects</div>
    }

    return (
        <div className={classes.root}>
            {Object.keys(projects).map((key: string) => 
                <div className={classes.row} key={key}>
                    <ProjectCard project={projects[key]} />
                </div>
            )}
        </div>
    );

}

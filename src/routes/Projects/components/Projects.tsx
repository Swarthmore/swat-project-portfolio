import * as React from "react";
import styles from "./styles";
import { useFirestoreConnect, populate, isLoaded, isEmpty, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ProjectCard from "../../../containers/ProjectCard/ProjectCard";
import { Project } from "../../../types/index";

export default function Projects() {

    const classes = styles();

    const params: { teamId: string } = useParams();
    
    const populates = [{ child: "meta.createdBy", root: "users" }]; 
    const collection = "projects";

    useFirestoreConnect([
        { 
            collection,
            populates
        } 
    ]);

    let projects = useSelector((state:any) => populate(state.firestore, "projects", populates));

    // convert to array
    if (projects) {
        projects = Object.keys(projects).map(key => ({ id: key, ...projects[key] }));
        if (params.teamId && params.teamId !== "all") {
            projects = projects.filter((project: any) => project.meta.createdBy.team === params.teamId);
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3">Project Board</Typography>
            {projects.map((project: Project) => <ProjectCard key={project.id} project={project} />)}
        </div>
    );

}

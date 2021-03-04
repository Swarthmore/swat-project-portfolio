import * as React from "react";
import styles from "./styles";
import { useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
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

    // Show message while projects are loading
    if (!isLoaded(projects)) {
        return <div>Loading...</div>
    }

    // Show message if there is are no projects 
    if (isEmpty(projects)) {
        return <div>Projects empty</div>
    }

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
            {Array.isArray(projects) && projects.map((project: Project) => <div className={classes.row} key={project.id}><ProjectCard project={project} /></div>)}
        </div>
    );

}

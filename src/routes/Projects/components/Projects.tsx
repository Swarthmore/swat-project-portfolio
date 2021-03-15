import React from "react";
import styles from "./styles";
import { useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ProjectCard from "../../../containers/ProjectCard/ProjectCard";
import { Project } from "../../../types/index";
import { PageTitle } from "../../../containers/PageTitle";

export default function Projects() {

    const classes = styles();

    const params: { teamId: string } = useParams();
    
    const populates = [{ child: "meta.createdBy", root: "users" }]; 

    useFirestoreConnect([
        { 
            collection: "projects",
            populates
        },
        {
            collection: "teams"
        } 
    ]);

    let projects = useSelector((state:any) => populate(state.firestore, "projects", populates));
    const teams = useSelector((state: any) => state.firestore.ordered.teams);

    // Show message while projects are loading
    if (!isLoaded(projects) || !isLoaded(teams)) {
        return <div>Loading...</div>
    }

    // Show message if there is are no projects 
    if (isEmpty(projects)) {
        return <div>Projects empty</div>
    }

    // Show message if there are no teams (this shouldn't happen)
    if (isEmpty(teams)) {
        return <div>Teams empty</div>
    }

    // convert to array
    if (projects) {
        projects = Object.keys(projects).map(key => ({ id: key, ...projects[key] }));
        if (params.teamId && params.teamId !== "all") {
            projects = projects.filter((project: any) => project.meta.createdBy.team === params.teamId);
        }
    }

    const [team] = teams.filter((team: any) => team.id === params.teamId);

    return (
        <div className={classes.root}>

            <PageTitle title={team ? team.name : "All"} />
            {Array.isArray(projects) && projects.map((project: Project) => (
                <div className={classes.row} key={project.id}>
                    <ProjectCard project={project} />
                </div>
            ))}
        </div>
    );

}

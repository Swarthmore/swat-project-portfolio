import React, {useEffect, useState} from "react";
import styles from "./styles";
import {useFirestoreConnect, populate, isLoaded, isEmpty, firebaseConnect} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ProjectCard from "../../../containers/ProjectCard/ProjectCard";
import { Project } from "../../../types/index";
import { PageTitle } from "../../../containers/PageTitle";
import {RootState} from "../../../store/reducer";
import useTeams from "../../../hooks/useTeams";

export default function Projects(props: any) {

    const [ready, setReady] = useState(false);
    const [team, setTeam] = useState("");

    const classes = styles();

    // get the team id from url params
    const { id }: { id: string } = useParams();

    const populates = [{ child: "meta.createdBy", root: "users" }];

    useFirestoreConnect([
        { 
            collection: "projects",
            populates,
            ...(id ? ["meta.createdBy.team", "==", id]: {})
        },
    ]);

    // at this point, the results aren't filtered because we need to populate the projects to get
    // the team id
    const projects = useSelector((state: RootState) => populate(state.firestore, "projects", populates));

    // filter the projects by team id
    const filteredProjects = projects && Object.keys(projects)
        .map(key => ({ id: key, ...projects[key] }))
        .filter(project => (id === "all" ? project : project.meta.createdBy.team === id))

    return (
        <div className={classes.root}>
            {filteredProjects && filteredProjects.map((project: Project) => <ProjectCard key={project.id} project={project} className={classes.row} />)}
        </div>
    );

}

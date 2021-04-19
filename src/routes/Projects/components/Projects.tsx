import React from "react";
import styles from "./styles";
import {useFirestoreConnect, populate, isLoaded, isEmpty} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {Grid, Typography} from "@material-ui/core";
import {Project, Team} from "../../../types/index";
import { PageTitle } from "../../../containers/PageTitle";
import {RootState} from "../../../store/reducer";
import useTeams from "../../../hooks/useTeams";
import PCard from "../../../containers/PCard/PCard";

export default function Projects(props: any) {

    const classes = styles();
    const { id }: { id: string } = useParams();
    const { teams, loaded: teamsAreLoaded } = useTeams();
    const { pathname } = useLocation();

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

    if (!isLoaded(projects) || !teamsAreLoaded) {
        return <div>Loading...</div>
    }

    if (isEmpty(projects)) {
        return <div>No projects found</div>
    }

    // filter the projects by team id
    const filteredProjects = Object.keys(projects)
        .map(key => ({ id: key, ...projects[key] }))
        .filter(project => (id === "all" ? project : project.meta.createdBy.team === id))

    const lastPathPart = pathname.split("/").pop();

    const teamName = lastPathPart === "all" ? "All" : teams.filter((team: Team) => team.id === id)[0].name || "Unknown";

    return (
        <div className={classes.root}>
            <PageTitle title={teamName} />
            {filteredProjects.length === 0 && <Typography variant="subtitle1">This team doesn't have any projects posted yet</Typography>}
            {filteredProjects.length > 0 && (
                <Grid container spacing={3}>
                    {filteredProjects.map((project: Project) => (
                        <Grid item md={3} key={project.id} className={classes.gridItem}>
                            <PCard project={project} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );

}

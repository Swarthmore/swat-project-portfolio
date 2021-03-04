import * as React from "react";
import styles from "./styles";
import { useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ProjectCard from "../../../containers/ProjectCard/ProjectCard";
import { Project } from "../../../types/index";

export default function Projects() {

    const [title, setTitle] = React.useState("Projects");

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

    // when the team id changes, make sure the page title is correct
    // TODO: THIS IS BAD CHANGE THIS
    React.useEffect(() => {

        if (params.teamId === "2Ic0FR9LZ6njQ6xO54co") {
            setTitle("Academic Technology Projects");
        } else if (params.teamId === "6nwyDhn3F8chk9uPxfiv") {
            setTitle("Web Team Projects");
        } else if (params.teamId === "rmiNR7hL6VSVjJSJe61l") {
            setTitle("AIS Projects");
        } else if (params.teamId === "xJd3FTSNpudQ0eX5d8No") {
            setTitle("Help Desk Projects");
        } else if (params.teamId === "yigGHL5Xcdu0N8gcCGI0") {
            setTitle("Networking Projects");
        } else if (params.teamId === "all") {
            setTitle("All Projects");
        }

    }, [params.teamId]);

    return (
        <div className={classes.root}>
            <Typography variant="h3">{title}</Typography>
            {Array.isArray(projects) && projects.map((project: Project) => <div className={classes.row} key={project.id}><ProjectCard project={project} /></div>)}
        </div>
    );

}

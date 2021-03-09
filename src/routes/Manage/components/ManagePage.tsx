import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty, useFirestore } from "react-redux-firebase";
import { RootState } from "../../../store/reducer";
import { useHistory } from "react-router-dom";
import { Paper, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Button } from "@material-ui/core";
import { Project } from "../../../types";

export default function ManagePage() {

    const history = useHistory();

    const firestore = useFirestore();

    // get the currently logged in user
    const auth = useSelector((state: RootState) => state.firebase.auth);

    // at this point we have the user id
    useFirestoreConnect([
        { collection: "projects", where: ["meta.createdBy", "==", auth.uid || 0] }
    ]);

    const projects = useSelector((state: RootState) => state.firestore.ordered.projects);

    if (!isLoaded(projects)) {
        return <>Loading...</>
    }

    if (isEmpty(projects)) {
        return <>You have no projects</>
    }

    const onEditClick = (e: React.MouseEvent<HTMLButtonElement>, project: Project) => {
        e.preventDefault();
        history.push(`/projects/edit/${project.id}`);
    }
    const onDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>, project: Project) => {
        e.preventDefault();
        // TODO: Add a confirmation before deleting
        await firestore.collection("projects").doc(project.id).delete();
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project: Project) => (
                        <TableRow key={project.id || project.name}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.description.length > 100 ? project.description.substr(0, 100) + "..." : project.description}</TableCell>
                            <TableCell>{project.deadline && new Date(project.deadline).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(project.meta.createdOn).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button onClick={e => onEditClick(e, project)}>Edit</Button>
                                <Button onClick={e => onDeleteClick(e, project)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}
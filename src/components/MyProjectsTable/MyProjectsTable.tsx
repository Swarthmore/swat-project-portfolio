/**
 * @description
 * 
 * This component will list out projects owned by the current user
 * 
 */

import * as React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useFirestoreConnect, populate, isLoaded, isEmpty, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { useHistory } from "react-router-dom";

export default function MyProjectsTable() {
    
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const firestore = useFirestore();
    const history = useHistory();

    if (!isLoaded(auth)) return <p>Loading auth...</p>

    const populates = [{ child: "createdBy", root: "users" }, { child: "members", root: "users" }]; 
    const collection = "projects";

    useFirestoreConnect([
        { 
            collection, 
            where: [["owner", "==", auth.uid]],
            populates
        } 
    ]);

    const projects = useSelector((state:any) => populate(state.firestore, "projects", populates));

    const deleteProject = async (id: string) => {
        await firestore.collection(collection).doc(id).delete();
        // TODO: Fix this. This is really stupid.
        history.push(history.location); 
    }

    return (
        <div>
            {isEmpty(projects) 
                ? <p>No projects yet</p> 
                : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Members</TableCell>
                                    <TableCell>Created On</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(projects).map(key => (
                                    <TableRow key={key}>
                                        <TableCell>{projects[key].name}</TableCell>
                                        <TableCell>{projects[key].members.length}</TableCell>
                                        <TableCell>{projects[key].createdOn}</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => deleteProject(key)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
        </div>
    );

}
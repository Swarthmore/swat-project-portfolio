import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useFirestoreConnect, isLoaded, isEmpty, useFirestore} from "react-redux-firebase";
import {RootState} from "../../../store/reducer";
import {useHistory} from "react-router-dom";
import {
    Paper,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    Button,
    IconButton
} from "@material-ui/core";
import {Project} from "../../../types";
import {dateString} from "../../../utils";
import useUid from "../../../hooks/useUid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";
import useSnax from "../../../hooks/useSnax";
import ProjectDialog from "../../../containers/ProjectDialog/ProjectDialog";

export default function ManagePage() {

    const [dialogState, setDialogState] = useState<{ open: boolean, project: Project | null }>({
        open: false,
        project: null
    });
    const [showDialog, setShowDialog] = useState(false);

    const history = useHistory();
    const firestore = useFirestore();
    const {uid} = useUid();
    const classes = styles();
    const {setSnack} = useSnax();

    // at this point we have the user id
    useFirestoreConnect([
        {
            collection: "projects",
            where: ["meta.createdBy", "==", uid],
            storeAs: "ownedProject"
        }
    ]);

    const projects = useSelector((state: RootState) => state.firestore.ordered.ownedProject);

    if (!isLoaded(projects)) {
        return <>Loading...</>;
    }

    if (isEmpty(projects)) {
        return <>You have no projects</>;
    }

    const onEditClick = (e: React.MouseEvent<HTMLButtonElement>, project: Project) => {
        e.preventDefault();
        history.push(`/projects/edit/${project.id}`);
    };

    const onDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>, project: Project) => {
        try {
            e.preventDefault();
            const confirmation = confirm("WARNING: This action is permanent. Click OK to proceed.");
            if (!confirmation) return;
            await firestore.collection("projects").doc(project.id).delete();
            setSnack({msg: "Project deleted", type: "success", open: true});
        } catch (error) {
            setSnack({msg: error.toString(), type: "error", open: true});
        }
    };

    const openDialog = (project: Project) => {
        setDialogState({open: true, project: project});
    };

    const closeDialog = () => {
        setDialogState({open: false, project: null});
    };

    return (
        <>
            {dialogState.project &&
            <ProjectDialog project={dialogState.project} handleClose={closeDialog}
                           open={dialogState.open}/>}
            <TableContainer component={Paper} className={classes.root}>
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
                            <TableRow key={project.id}>
                                <TableCell>
                                    <Button onClick={() => openDialog(project)}>
                                        {project.name}
                                    </Button>
                                </TableCell>
                                <TableCell className={classes.descriptionCell}>
                                    {project.description.length > 100
                                        ? project.description.substr(0, 100) + "..."
                                        : project.description}
                                </TableCell>
                                <TableCell>
                                    {project.deadline && new Date(project.deadline).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {dateString(project.meta.createdOn)}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={e => onEditClick(e, project)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={e => onDeleteClick(e, project)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

}
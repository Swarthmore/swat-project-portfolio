import {
    Dialog,
    DialogProps,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
import {useStyles} from "./styles";
import {useLayoutEffect, useRef} from "react";
import {Project} from "../../types";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";
import StatusUpdate from "../StatusUpdate/StatusUpdate";
import useUid from "../../hooks/useUid";
import firebase from "firebase";
import useSnax from "../../hooks/useSnax";
import {useFirestore} from "react-redux-firebase";

interface ProjectDialogProps extends DialogProps {
    project: Project,
    handleClose: () => void
}

export default function ProjectDialog({
    project,
    open,
    handleClose,
    ...rest
}: ProjectDialogProps) {

    const classes = useStyles();

    const ref = useRef<HTMLElement | null>(null);

    const {uid} = useUid();
    const isOwner = project.meta.ownedBy === uid;
    const {setSnack} = useSnax();
    const firestore = useFirestore();

    useLayoutEffect(() => {
        if (open) {
            const {current} = ref;
            if (current) {
                current.focus();
            }
        }
    }, [open]);

    const updateStatus = async (value: string) => {
        try {
            const update = {
                value: value,
                createdOn: Date.now().toString(),
                createdBy: uid
            }
            await firestore.update(`projects/${project.id}`, { updates:  firebase.firestore.FieldValue.arrayUnion(update) });
            setSnack({ msg: "Status update posted", type: "success", open: true });
            handleClose();
        } catch(error) {
            setSnack({ msg: error.toString(), type: "error", open: true });
            handleClose();
        }
    }

    return (
        <Dialog
            className={classes.root}
            scroll="paper"
            open={open}
            onClose={handleClose}
            {...rest}
        >
            <DialogTitle>{project.name}</DialogTitle>
            <DialogContent>
                <div>
                    {isOwner && <StatusUpdate onSubmit={updateStatus} />}
                </div>
                {project.markdown &&
                <MarkdownRenderer>{project.markdown}</MarkdownRenderer>}
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}>Close</Button>

            </DialogActions>
        </Dialog>
    );
}
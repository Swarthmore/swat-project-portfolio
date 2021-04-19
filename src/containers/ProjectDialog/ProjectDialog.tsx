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

    useLayoutEffect(() => {
        if (open) {
            const {current} = ref;
            if (current) {
                current.focus();
            }
        }
    }, [open]);

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
                {project.markdown &&
                <MarkdownRenderer>{project.markdown}</MarkdownRenderer>}
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
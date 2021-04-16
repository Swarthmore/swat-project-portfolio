import { TextField, Button, Typography, Link } from "@material-ui/core";
import React from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Project } from "../../../types";
import { RootState } from "../../../store/reducer";
import styles from "./styles";
import { DatePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import { FormSubmitButton } from "../../../containers/FormSubmitButton/FormSubmitButton";
import useSnax from "../../../hooks/useSnax";
import {SINGLE_PATH} from "../../../constants/paths";
import MD from "react-markdown";
import gfm from "remark-gfm"
import MarkdownRenderer from "../../../containers/MarkdownRenderer/MarkdownRenderer";

export const markdownCheat = "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet";

export default function AddProjectPage() {

    // whether or not to show markdown preview
    const [mdPreview, setMdPreview] = React.useState(false);

    const firestore = useFirestore();
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const classes = styles();
    const {setSnack} = useSnax();

    // if auth.email is not from swarthmore, log the user out

    const history = useHistory();

    // the name field
    const { 
        value: name, 
        bind: bindName, 
        reset: resetName 
    } = useInput("");

    // the description field
    const { 
        value: description, 
        bind: bindDescription, 
        reset: resetDescription 
    } = useInput("");

    // the deadline field
    const { 
        value: deadline, 
        bind: bindDeadline, 
        reset: resetDeadline
    } = useInput(new Date(Date.now()).toISOString());

    // the markdown field
    const { 
        value: markdown, 
        bind: bindMarkdown, 
        reset: resetMarkdown
     } = useInput("");

    // adds a project to firestore
    function addProject(project: Project) {
        return firestore.collection('projects').add(project);
    }

    // resets the form fields
    function resetForm() {
        resetName(undefined)
        resetDescription(undefined)
        resetDeadline(undefined);
        resetMarkdown(undefined);
    }

    // onSubmit will get called when the submit button is clicked
    async function onSubmit(event: React.SyntheticEvent) {

        event.preventDefault();
        
        const uid = auth.uid.toString();

        const project: Project = {
            name,
            description,
            markdown,
            deadline,
            meta: {
                ownedBy: uid,
                createdBy: uid,
                createdOn: Date.now().toString() 
            },
            updates: []
        }

        try {
            const res = await addProject(project);
            resetForm();
            setSnack({ type: "success", msg: "Project created success", open: true });
            history.push(SINGLE_PATH.replace(":id", res.id));
            
        } catch (error) {
            setSnack({ type: "error", msg: error.toString(), open: true });
        }

    }

    const handlePreviewClick = () => {
        setMdPreview(true);
    }

    const closeMarkdownPreview = () => {
        setMdPreview(false);
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3">Add Project</Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <TextField className={classes.field} label="Enter a name for your project" variant="filled" required {...bindName} />
                <TextField className={classes.field} label="Give your project a short description" variant="filled" required {...bindDescription} />

                <DatePicker label="Project Deadline" className={classes.field} format="MM/DD/yyyy" disablePast={true} {...bindDeadline} />

                {mdPreview
                    ? (
                        <div className={classes.field}>
                            <Typography variant="caption" gutterBottom>Markdown Preview</Typography>
                            <MarkdownRenderer children={markdown} />
                            <Button fullWidth size="large" variant="contained" onClick={closeMarkdownPreview}>Edit</Button>
                        </div>

                    ) : (
                        <>
                            <div className={classes.field}>
                                <label>
                                    Tell us about your project. You can use Markdown, but keep it under 400 characters
                                </label>
                                <br/>
                                <Link href={markdownCheat} target="_blank" color="secondary">Markdown Cheat Sheet</Link>
                                <TextField className={classes.field} fullWidth label="Markdown description" rows={10} rowsMax={10}
                                           variant="filled" multiline {...bindMarkdown} />
                            </div>
                            <Button size="large" variant="contained" onClick={handlePreviewClick} disabled={mdPreview}>Preview Markdown</Button>
                        </>
                )}


                <FormSubmitButton label="Submit" />
            </form>
        </div>
    )

}
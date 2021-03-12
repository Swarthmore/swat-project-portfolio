import { TextField, Button, Typography } from "@material-ui/core";
import React from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Project } from "../../../types";
import { RootState } from "../../../store/reducer";
import styles from "./styles";
import { DatePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import useInput from "../../../hooks/useInput";

export default function AddProjectPage() {

    // whether or not to show markdown preview
    const [mdPreview, setMdPreview] = React.useState(false);

    const firestore = useFirestore();
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const classes = styles();

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
            history.push(`/projects/${res.id}`);
            
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className={classes.root}>
            <Typography variant="h3">Add Project</Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <TextField className={classes.field} label="Enter a name for your project" variant="filled" required {...bindName} />
                <TextField className={classes.field} label="Give your project a short description" variant="filled" required {...bindDescription} />
                <DatePicker className={classes.field} format="MM/DD/yyyy" disablePast={true} {...bindDeadline} />
                <TextField className={classes.field} label="Tell us about your project. You can use Markdown, but keep it under 400 characters" rows="10" rowsMax="10" variant="filled" multiline fullWidth {...bindMarkdown} />
                <Button className={classes.button} type="submit">Submit</Button>
            </form>
        </div>
    )

}
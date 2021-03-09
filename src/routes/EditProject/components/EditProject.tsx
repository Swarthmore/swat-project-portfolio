import React from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useFirestore, useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import styles from "./styles";
import { DatePicker } from "@material-ui/pickers";
import { useHistory, useParams } from "react-router-dom";
import useInput from "../../../hooks/useInput";

export default function EditProjectPage() {

    const params: { id: string } = useParams();
    const history = useHistory();
    const firestore = useFirestore();

    if (!params.id) {
        history.push("/");
    }

    const classes = styles();

    const populates = [{ child: "meta.createdBy", root: "users" }];
    const collection = "projects";
    const doc = params.id;

    useFirestoreConnect([
        { collection, populates, doc }
    ]);

    const projects = useSelector((state: any) => populate(state.firestore, "projects", populates));

    // Show message while project is loading
    if (!isLoaded(projects)) {
        return <div>Loading...</div>
    }

    // Show message if there is no project 
    if (isEmpty(projects)) {
        return <div>Project is empty</div>
    }

    // the name field
    const { 
        value: name, 
        bind: bindName, 
        reset: resetName 
    } = useInput(projects[params.id].name);

    // the description field
    const { 
        value: description, 
        bind: bindDescription, 
        reset: resetDescription 
    } = useInput(projects[params.id].description);

    // the deadline field
    const { 
        value: deadline, 
        bind: bindDeadline, 
        reset: resetDeadline
    } = useInput(projects[params.id].deadline);

    // the markdown field
    const { 
        value: markdown, 
        bind: bindMarkdown, 
        reset: resetMarkdown
    } = useInput(projects[params.id].markdown);

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
        
        const updatedProject = {
            name,
            description,
            markdown,
            deadline
        }

        try {
            await firestore.update(`projects/${params.id}`, updatedProject)
            resetForm();
            history.push(`/projects/${params.id}`);

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className={classes.root}>
            <Typography variant="h3">Edit Project</Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <TextField className={classes.field} label="Enter a name for your project" variant="filled" required {...bindName} />
                <TextField className={classes.field} label="Give your project a short description" variant="filled" required {...bindDescription} />
                <DatePicker className={classes.field} format="MM/DD/yyyy" {...bindDeadline} />
                <TextField className={classes.field} label="Tell us about your project. You can use Markdown, but keep it under 400 characters" rows="10" rowsMax="10" variant="filled" multiline fullWidth {...bindMarkdown} />
                <Button className={classes.button} type="submit">Submit</Button>
            </form>
        </div>
    )

}
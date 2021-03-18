import React from "react";
import { TextField, Button, Typography, Card, CardContent, CardActions } from "@material-ui/core";
import { useFirestore, useFirestoreConnect, populate, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import styles from "./styles";
import { DatePicker } from "@material-ui/pickers";
import { useHistory, useParams } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import { RootState } from "../../../store/reducer";
import { dateString } from "../../../utils";
import { FormSubmitButton } from "../../../containers/FormSubmitButton/FormSubmitButton";
import {HOME_PATH, SINGLE_PATH} from "../../../constants/paths";

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

    const projects = useSelector((state: RootState) => populate(state.firestore, "projects", populates));

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
            history.push(SINGLE_PATH.replace(":id", params.id));

        } catch (error) {
            console.error(error);
        }

    }

    const deleteUpdate = async (update: any) => {
        try {
            const updatedData = {
                updates: firestore.FieldValue.arrayRemove(update)
            }
            const confirmed = confirm("WARNING: This action is permanent. Proceed?");
            if (!confirmed) return;
            await firestore.update({ collection: "projects", doc: params.id }, updatedData);
            // TODO: this is hacky and should be fixed
            history.push(HOME_PATH);
        
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" gutterBottom>Edit Project</Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <TextField className={classes.field} label="Enter a name for your project" variant="filled" required {...bindName} />
                <TextField className={classes.field} label="Give your project a short description" variant="filled" required {...bindDescription} />
                <DatePicker className={classes.field} format="MM/DD/yyyy" {...bindDeadline} />
                <TextField className={classes.field} label="Project Markdown" rows="10" rowsMax="10" variant="filled" multiline fullWidth {...bindMarkdown} />
                <FormSubmitButton label="Save" />
            </form>


            <div className={classes.updates}>
                {<Typography variant="h5" gutterBottom>Updates</Typography>}
                {projects[params.id].updates.length === 0 && <Typography>You haven't posted any updates to this project yet</Typography>}
                {projects[params.id].updates.map((update: any, i: number) => (
                    <Card key={i}>
                        <CardContent>
                            <Typography variant="subtitle1">{dateString(update.createdOn)}</Typography>
                            <Typography>{update.value}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => deleteUpdate(update)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    )

}
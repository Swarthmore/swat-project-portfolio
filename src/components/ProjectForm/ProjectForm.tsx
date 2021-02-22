/**
 * @description
 * 
 * This component provides a <form> element that is used to create a project in Firebase. When the form
 * is submitted, the onSubmit callback (this needs to be provided in the props) is fired
 * 
 */

import { TextField, Button } from "@material-ui/core";
import * as React from "react";
import useInput from "../../hooks/useInput";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Project } from "../../types/Project";
import { RootState } from "../../reducer"
import { useStyles } from "./useStyles";
import { DatePicker } from "@material-ui/pickers";
import * as Markdown from "react-markdown";
import { useHistory } from "react-router-dom";

export default function ProjectForm() {

    // whether or not to show markdown preview
    const [mdPreview, setMdPreview] = React.useState(false);

    const firestore = useFirestore();
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const classes = useStyles();

    const history = useHistory();

    // the name field
    const { value: name, bind: bName, reset: rName } = useInput("");
    // the short description field
    const { value: shortDesc, bind: bShortDesc, reset: rShortDesc } = useInput("");
    // the deadline field
    const { value: deadline, bind: bDeadline, reset: rDeadline } = useInput(new Date(Date.now()).toISOString());
    // the description field
    const { value: desc, bind: bDesc, reset: rDesc } = useInput("");

    // toggle markdown preview mode
    function togglePreview() {
        setMdPreview(!mdPreview);
    }

    // adds a project to firestore
    function addProject(project: Project) {
        return firestore.collection('projects').add(project);
    }

    // resets the form fields
    function resetForm() {
        rName(undefined);
        rShortDesc(undefined);
        rDeadline(new Date(Date.now()).toISOString());
        rDesc(undefined);
    }

    // onSubmit will get called when the submit button is clicked
    async function onSubmit(event: React.SyntheticEvent) {

        event.preventDefault();
        
        const uid = auth.uid.toString();

        const project: Project = {
            name,
            shortDescription: shortDesc,
            deadline,
            members: [uid],
            description: desc,
            owner: uid,
            createdBy: uid,
            createdOn: new Date(Date.now()).toISOString()
        }

        await addProject(project)
        .then(res => {
            resetForm();
            // redirect the user to the project page
            const id = res.id;
            history.push(`/projects/${id}`);
        })
        .catch(error => {
            console.error(error)
        })

    }

    return (
        <form className={classes.root} onSubmit={onSubmit}>
            <TextField className={classes.field} label="Enter a name for your project" variant="filled" required {...bName} />
            <TextField className={classes.field} label="Give your project a short description" variant="filled" required {...bShortDesc} />
            <DatePicker className={classes.field} format="MM/DD/yyyy" disablePast={true} {...bDeadline} />

            <Button
                variant={mdPreview ? "contained" : "outlined"}
                color={mdPreview ? "secondary" : "primary"}
                className={classes.mdButton}
                onClick={togglePreview}
                disabled={desc.length === 0}
            >
                {mdPreview ? "Return to edit post" : "Preview post"}
            </Button>

            {mdPreview && (
                <div className={classes.preview}>
                    <Markdown source={desc} />
                </div>
            )}
            
            {!mdPreview && <TextField className={classes.field} label="Tell us about your project. You can use Markdown, but keep it under 400 characters" rows="10" rowsMax="10" variant="filled" multiline fullWidth {...bDesc} />}

            <Button className={classes.button} type="submit">Submit</Button>
        </form>
    )

}
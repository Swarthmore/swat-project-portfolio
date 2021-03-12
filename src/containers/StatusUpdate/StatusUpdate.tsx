import React from "react";
import { TextField, Button } from "@material-ui/core";
import styles from "./styles";

export default function StatusUpdate({ onSubmit }: { onSubmit: (val: string) => void }) {

    const [val, setVal] = React.useState("");

    const classes = styles();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // restrict to 300 characters
        setVal(
            e.target.value.slice(0, 300)
        )
    }


    const onClick = (val:string) => {

        try {
            onSubmit(val);
            // clear the form
            setVal("");
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className={classes.root}>
            <TextField value={val} onChange={onChange} fullWidth variant="filled" label="Share an update about this project" />
            <Button onClick={() => onClick(val)}>Post Update</Button>
        </div>
    )

}
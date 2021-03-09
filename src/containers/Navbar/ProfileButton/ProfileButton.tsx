import React from "react";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ProfileIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";

export default function ProfileButton() {

    const auth = useSelector((state: any) => state.firebase.auth)
    const history = useHistory();

    if (!auth.uid) {
        return <>no uid</>
    }
    return (
        <Tooltip title="View Profile">
            <IconButton color="inherit" aria-label="View Profile" component="span" onClick={() => history.push("/manage")}>
                <ProfileIcon />
            </IconButton>
        </Tooltip>      
    );

}
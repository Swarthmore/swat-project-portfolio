import React from "react";
import { Team } from "../../types";
import { MenuList, MenuItem, Divider } from "@material-ui/core";
import styles from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirestore } from "react-redux-firebase";
import { RootState } from "../../store/reducer";

export default function SideMenu() {

    const classes = styles();
    const history = useHistory();

    const auth = useSelector((state: RootState) => state.firebase.auth);
    const teams = useSelector((state: RootState) => state.firestore.data.teams);
    
    if (!isLoaded(teams) || !isLoaded(teams)) {
        return <div>Loading...</div>
    }

    if (isEmpty(teams)) {
        return <div>No teams found</div>
    }

    // handle what happens when the user clicks on a team 
    const onSelect = (id: string) => {
        // go the project listing page for the specified team
        history.push(`/projects/by-team/${id}`);
    }

    const onShowAllClick = () => {
        history.push("/projects/by-team/all");
    }

    const onAddClick = () => {
        history.push("/projects/add");
    }

    return (
        <MenuList className={classes.root}>

            {Object.keys(teams).map((key: string, i: number) => (
                <MenuItem key={i} onClick={() => onSelect(key)}>
                    {teams[key].name}
                </MenuItem>
            ))}

            <Divider />
            <MenuItem onClick={onShowAllClick}>
                {"Show All"}
            </MenuItem>
            <Divider />
            {!isEmpty(auth) && <MenuItem onClick={onAddClick}>
                {"Add Project"}
            </MenuItem>}
        </MenuList>
    );

}
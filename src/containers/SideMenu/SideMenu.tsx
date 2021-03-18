import React from "react";
import { MenuList, MenuItem, Divider } from "@material-ui/core";
import styles from "./styles";
import { useHistory } from "react-router-dom";
import useTeams from "../../hooks/useTeams";
import useUid from "../../hooks/useUid";
import {Team} from "../../types";
import {ADD_PROJECT_ROUTE, LIST_BY_TEAM} from "../../constants/paths";

export default function SideMenu() {

    const classes = styles();
    const history = useHistory();

    const { uid } = useUid();
    const { teams, loaded } = useTeams();

    const onSelect = (id: string) => {
        history.push(LIST_BY_TEAM.replace(":id", id));
    }

    const onShowAllClick = () => {
        history.push(LIST_BY_TEAM.replace(":id", "all"));
    }

    const onAddClick = () => {
        history.push(ADD_PROJECT_ROUTE);
    }

    return !loaded
        ? <>Loading</>
        : (
            <MenuList className={classes.root}>
                {teams.map((team: Team) => <MenuItem key={team.id} onClick={() => onSelect(team.id)}>{team.name}</MenuItem>)}
                <Divider />
                <MenuItem onClick={onShowAllClick}>
                    {"Show All"}
                </MenuItem>
                <Divider />
                {uid && <MenuItem onClick={onAddClick}>
                    {"Add Project"}
                </MenuItem>}
            </MenuList>
        );

}
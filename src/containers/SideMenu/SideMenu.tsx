import React from "react";
import { MenuList, MenuItem, Divider } from "@material-ui/core";
import styles from "./styles";
import {useHistory, useLocation} from "react-router-dom";
import useTeams from "../../hooks/useTeams";
import useUid from "../../hooks/useUid";
import {Team} from "../../types";
import {ADD_PROJECT_ROUTE, LIST_BY_TEAM, MANAGE_PATH} from "../../constants/paths";

export default function SideMenu() {

    const classes = styles();
    const history = useHistory();
    const { pathname } = useLocation();

    const { uid } = useUid();
    const { teams, loaded } = useTeams();

    if (!uid) {
        return <div>Not logged in</div>
    }

    const onSelect = (id: string) => {
        history.push(LIST_BY_TEAM.replace(":id", id));
    }

    const onShowAllClick = () => {
        history.push(LIST_BY_TEAM.replace(":id", "all"));
    }

    const onAddClick = () => {
        history.push(ADD_PROJECT_ROUTE);
    }

    const onManageClick = () => {
        history.push(MANAGE_PATH);
    }


    const lastPathPart = pathname.split("/").pop();

    return !loaded
        ? <>Loading</>
        : (
            <MenuList className={classes.root}>
                {teams.map((team: Team) => <MenuItem key={team.id} onClick={() => onSelect(team.id)}>
                    {lastPathPart === team.id ? <strong>{team.name}</strong> : team.name}
                </MenuItem>)}
                <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
                <MenuItem onClick={onShowAllClick}>
                    {lastPathPart === "all" ? <strong>All Projects</strong> : "All Projects"}
                </MenuItem>
                <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
                {uid && (
                    <div>
                        <MenuItem onClick={onAddClick}>
                            {lastPathPart === "add" ? <strong>Add Project</strong> : "Add Project"}
                        </MenuItem>
                        <MenuItem onClick={onManageClick}>
                            {lastPathPart === "manage" ? <strong>My Projects</strong> : "My Projects"}
                        </MenuItem>
                    </div>
                )}
            </MenuList>
        );

}
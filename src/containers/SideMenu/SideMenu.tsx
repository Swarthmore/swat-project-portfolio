import * as React from "react";
import * as Faker from "faker";
import { Team } from "../../types";
import { MenuList, MenuItem, Divider } from "@material-ui/core";
import styles from "./styles";
import { useHistory, useLocation } from "react-router-dom";

export default function SideMenu() {

    const classes = styles();
    const history = useHistory();
    const location = useLocation();

    const [selected, setSelected] = React.useState<Team|null>(null);

    // TODO: Pull these from firestore instead
    const teams: Team[] = [
        { id: "2Ic0FR9LZ6njQ6xO54co", name: "Academic Technology" },
        { id: "6nwyDhn3F8chk9uPxfiv", name: "Web Team" },
        { id: "rmiNR7hL6VSVjJSJe61l", name: "AIS" },
        { id: "yigGHL5Xcdu0N8gcCGI0", name: "Networking" },
        { id: "xJd3FTSNpudQ0eX5d8No", name: "Help Desk" }
    ];

    // handle what happens when the user clicks on a team 
    const onSelect = (team: Team) => {
        // go the project listing page for the specified team
        setSelected(team);
        history.push(`/projects/by-team/${team.id}`);
    }

    const onShowAllClick = () => {
        setSelected({ id: "Show All", name: "Show All" });
        history.push("/projects/by-team/all");
    }

    const onAddClick = () => {
        setSelected({ id: "Add", name: "Add" });
        history.push("/projects/add");
    }

    React.useEffect(() => {
        if (!location.pathname.startsWith("/projects/by-team/")) {

            if (location.pathname.startsWith("/projects/add")) {
                setSelected({ id: "Add", name: "Add" });
            } else {
                setSelected(null);
            }

        }
    }, [location.pathname])

    return (
        <MenuList className={classes.root}>
            {teams.map(team => (
                    <MenuItem key={team.id} onClick={() => onSelect(team)}>
                        {selected ? selected.name === team.name ? <strong>{team.name}</strong> : team.name : team.name}
                    </MenuItem>
                )
            )}
            <Divider />
            <MenuItem onClick={onShowAllClick}>
                {selected ? selected.name === "Show All" ? <strong>Show All</strong> : "Show All" : "Show All"}
            </MenuItem>
            <Divider />
            <MenuItem onClick={onAddClick}>
                {selected ? selected.name === "Add" ? <strong>Add Project</strong> : "Add Project" : "Add Project"}
            </MenuItem>
        </MenuList>
    );

}
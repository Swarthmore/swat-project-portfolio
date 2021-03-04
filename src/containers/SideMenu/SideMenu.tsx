import * as React from "react";
import * as Faker from "faker";
import { Team } from "../../types/Team";
import { MenuList, MenuItem, Divider } from "@material-ui/core";
import styles from "./styles";
import { useHistory } from "react-router-dom";

export default function SideMenu() {

    const classes = styles();
    const history = useHistory();

    const [selected, setSelected] = React.useState<Team|null>(null);

    // set some fake teams
    const teams: Team[] = [
        { id: "2Ic0FR9LZ6njQ6xO54co", name: "Academic Technology", owner: "0", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["0"] },
        { id: "1", name: "Web Team", owner: "1", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["1"] },
        { id: "2", name: "AIS", owner: "2", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["2"] },
        { id: "3", name: "Networking", owner: "3", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["3"] },
    ];

    // handle what happens when the user clicks on a team 
    const onSelect = (team: Team) => {
        // go the project listing page for the specified team
        setSelected(team);
        history.push(`/projects/${team.id}`);
    }

    return (
        <MenuList className={classes.root}>
            {teams.map(team => <MenuItem key={team.id} onClick={() => onSelect(team)}>{selected ? selected.name === team.name ? <strong>{team.name}</strong> : team.name : team.name}</MenuItem>)}
            <Divider />
            <MenuItem onClick={() => history.push("/projects/all")}>
                Show All
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => history.push("/projects/add")}>
                Add Project
            </MenuItem>
        </MenuList>
    );

}
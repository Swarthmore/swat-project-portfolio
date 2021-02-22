import * as React from "react";
import * as Faker from "faker";
import { Team } from "../../types/Team";
import { MenuList, MenuItem, Divider } from "@material-ui/core";
import { useStyles } from "./useStyles";
import { useHistory } from "react-router-dom";

interface Props {
    onSelect: (team: Team) => void 
} 
export default function SideMenu(props: Props) {

    const classes = useStyles();
    const history = useHistory();

    const [selected, setSelected] = React.useState<Team|null>(null);

    // set some fake teams
    const teams: Team[] = [
        { id: "0", name: "Academic Technology", owner: "0", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["0"] },
        { id: "1", name: "Web Team", owner: "1", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["1"] },
        { id: "2", name: "AIS", owner: "2", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["2"] },
        { id: "3", name: "Networking", owner: "3", createdOn: Faker.date.past(1).toLocaleDateString(), members: ["3"] },
    ];

    // handle what happens when the user clicks on a team 
    const onSelect = (team: Team) => {
        setSelected(team);
        props.onSelect(team);
    }

    return (
        <MenuList className={classes.root}>
            {teams.map(team => <MenuItem key={team.id} onClick={() => onSelect(team)}>{selected ? selected.name === team.name ? <strong>{team.name}</strong> : team.name : team.name}</MenuItem>)}
            <Divider />
            <MenuItem onClick={() => history.push("/projects/add")}>
                Add Project
            </MenuItem>
        </MenuList>
    );

}
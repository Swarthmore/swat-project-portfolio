import React from "react";
import { Divider, Collapse, IconButton, Button, Card, CardContent, CardActions, Typography, CardHeader, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./styles";
import { createMeta, dateString } from "../../utils";

export default function ProjectCard({ project, ...rest }: any) {

    const [expanded, setExpanded] = React.useState(false);

    const history = useHistory();
    const classes = styles();

    const handleExpandClick = () => setExpanded(!expanded);

    // Get the last status update. If the project has no status updates, use the createdOn date.

    return (
        <Card {...rest}>
            <CardHeader
                avatar={
                    <Avatar src={project.meta.createdBy.avatarUrl} />
                }
                title={project.name}
                subheader={dateString(project.meta.createdOn)}
            />
            <CardContent>
                <Typography>{project.description}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button onClick={() => history.push(`/projects/${project.id}`)}>Read More</Button>
                <IconButton onClick={handleExpandClick}>
                    <ExpandMoreIcon className={expanded ? classes.expand : classes.expandOpen} />
                </IconButton>
            </CardActions>
            {project.updates && project.updates.length > 0 && <Collapse in={expanded} timeout="auto" unmountOnExit>
                {project.updates.map((update:any) => (
                    <Card key={update.value}>
                        <CardContent>
                            <Typography variant="subtitle2">{dateString(update.createdOn)}</Typography>
                            <Typography>{update.value}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Collapse>}
        </Card>
    );

}
import React from "react";
import { Button, Card, CardContent, CardProps, CardActions, Typography } from "@material-ui/core";
import { Project } from "../../types";
import { useHistory } from "react-router-dom";
interface Props extends CardProps {
    project: Project
}

export default function ProjectCard({ project, ...rest }: Props) {

    const history = useHistory();

    return (
        <Card {...rest}>
            <CardContent>
                <Typography variant="h5">{project.name}</Typography>
                <Typography>{project.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => history.push(`/projects/${project.id}`)}>Read More</Button>
            </CardActions>
        </Card>
    );

}
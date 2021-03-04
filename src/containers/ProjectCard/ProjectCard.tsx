import React from "react";
import { Button, Card, CardContent, CardProps, Typography } from "@material-ui/core";
import { Project } from "../../types";

interface Props extends CardProps {
    project: Project
}

export default function ProjectCard({ project, ...rest }: Props) {

    return (
        <Card {...rest}>
            <CardContent>
                <Typography variant="h5">{project.name}</Typography>
                <Typography>{project.description}</Typography>
                <Button>Read More</Button>
            </CardContent>
        </Card>
    );

}
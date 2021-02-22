/**
 * @description
 * 
 * This component displays a paginated list of projects.
 * 
 */

import * as React from "react";
import { Project } from "../../types/Project";
import * as Faker from "faker";
import { Button, Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStyles } from "./useStyles";

export default function ProjectsGrid() {

    const history = useHistory();
    const classes = useStyles();

    // helper function to generate a bunch of fake projects
    const generateProjects = (count: number): Project[] => {
        let i = 0;
        const projects: Project[] = [];
        do {
            const user = Faker.name.firstName() + " " + Faker.name.lastName()
            projects.push({
                createdBy: user,
                owner: Faker.random.number().toString(),
                createdOn: Faker.date.past(1).toLocaleDateString(),
                name: Faker.lorem.sentence(),
                shortDescription: Faker.lorem.sentence(),
                description: Faker.lorem.paragraphs(2),
                id: Faker.random.uuid()
            });
            i++;
        } while (i <= count);
        return projects;
    }

    const projects = generateProjects(100);

    return (
        <Container>
            {projects.length === 0 && <p>No projects were found.</p>}
            {projects.map(project => <div key={project.id} className={classes.project}>
                <Typography variant="h3">{project.name}</Typography>
                <Typography variant="subtitle1" gutterBottom>Posted by {project.createdBy} on {project.createdOn}</Typography>
                <Typography variant="body1">{project.shortDescription}</Typography>
                <Button onClick={() => history.push(`/projects/${project.id}`)}>Read More</Button>
            </div>)}
        </Container>
    );

}
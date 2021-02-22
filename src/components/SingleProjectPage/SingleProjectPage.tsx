import * as React from "react";
import * as Faker from "faker";
import { useParams } from "react-router-dom";
import { Project } from "../../types/Project";
import { Typography, Container } from "@material-ui/core";
import * as Markdown from "react-markdown";

export default function SingleProjectPage() {

    const params: { id?: string } = useParams();

    if (!params.id) {
        return <p>No project id given.</p>
    }

    // Get the project
    const user = Faker.name.firstName() + " " + Faker.name.lastName();
    const project: Project = {
        createdBy: user,
        owner: Faker.random.number().toString(),
        createdOn: Faker.date.past(1).toLocaleDateString(),
        name: Faker.lorem.sentence(),
        shortDescription: Faker.lorem.sentence(),
        description: Faker.lorem.paragraphs(2),
        id: Faker.random.uuid()
    }

    return (
        <Container>
            <Typography variant="h1">{project.name}</Typography>
            <Typography variant="subtitle1">Posted by {project.createdBy} on {project.createdOn}</Typography>
            {/* Render the markdown */}
            {project.description && <Markdown source={project.description} />}
        </Container>
    );

}
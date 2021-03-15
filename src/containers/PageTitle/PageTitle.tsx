import { Typography } from "@material-ui/core";

export function PageTitle({ title }: { title: string }) {

    return (
        <Typography variant="h4" gutterBottom >{title} Projects</Typography>
    );

}
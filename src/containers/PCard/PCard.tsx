import {Project} from "../../types";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader, Collapse, IconButton, IconButtonProps, Tooltip,
    Typography
} from "@material-ui/core";
import useStyles from "./styles";
import {More} from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, {useState} from "react";
import {sortUpdates} from "../../utils";
import {useHistory} from "react-router-dom";
import ProjectDialog from "../ProjectDialog/ProjectDialog";

export interface PCardProps {
    project: Project &
        {
            meta: {
                createdBy: any,
                createdOn: any,
                [k:string]: any
            }
        }
}

function ReadMoreIconButton(props: IconButtonProps) {
    return (
        <Tooltip title="Read More">
            <IconButton {...props}>
                <More />
            </IconButton>
        </Tooltip>
    )
}

interface ExpandIconButtonProps extends IconButtonProps {
    tooltipMsg: string
}

function ExpandIconButton({ tooltipMsg, ...rest }: ExpandIconButtonProps) {
    return (
        <Tooltip title={tooltipMsg}>
            <IconButton {...rest}>
                <ExpandMoreIcon />
            </IconButton>
        </Tooltip>
    )
}

export default function PCard({ project, ...rest }: PCardProps) {

    const classes = useStyles();
    const history = useHistory();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleExpandClick = () => setIsExpanded(!isExpanded);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const parseCreatedOnToDate = (str: string) => {
        const date = new Date(parseInt(str));
        return date.toLocaleDateString();
    }

    const hasUpdates = project.updates && project.updates.length > 0;

    const firstUpdate = hasUpdates ? project.updates?.[0] : undefined;

    return (

            <>

                <ProjectDialog project={project} open={isOpen} handleClose={handleClose} />

                <Card className={classes.root} {...rest}>

                <CardHeader
                    title={project.name}
                    subheader={`${project.meta.createdBy.displayName} on ${parseCreatedOnToDate(project.meta.createdOn)}`}
                    avatar={
                        <Avatar
                            src={project.meta.createdBy.avatarUrl}
                        />
                    }
                />

                <CardContent className={classes.content}>
                    {firstUpdate && (
                        <Typography variant="body2">
                            {firstUpdate.value}
                        </Typography>
                    )}
                </CardContent>

                <CardActions className={classes.actions}>
                    <ReadMoreIconButton onClick={handleOpen} />
                    {firstUpdate && (
                        <>
                            <Typography className={classes.updateDate} variant="caption" align="center" color="textSecondary">
                                {parseCreatedOnToDate(firstUpdate.createdOn)}
                            </Typography>
                            {project.updates && project.updates?.length > 0 && (
                                <ExpandIconButton
                                    className={isExpanded ? classes.expand : classes.expandOpen}
                                    onClick={handleExpandClick}
                                    tooltipMsg={`${project.updates.length} more update${project.updates.length  > 1 ? "s" : ""}`}
                                />
                            )}
                        </>
                    )}
                </CardActions>

                {project.updates && project.updates?.length > 0 && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit={true}>
                        {sortUpdates(Array.from(project.updates)).map(update => (
                           <CardContent key={update.value}>
                               <Typography variant="h6">{parseCreatedOnToDate(update.createdOn)}</Typography>
                               <Typography variant="body2">{update.value}</Typography>
                           </CardContent>
                        ))}
                    </Collapse>
                )}

            </Card>
        </>
    )
}
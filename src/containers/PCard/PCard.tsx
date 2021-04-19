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
import {useState} from "react";
import {sortUpdates} from "../../utils";
import {SINGLE_PATH} from "../../constants/paths";
import {useHistory} from "react-router-dom";

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

function ExpandIconButton(props: IconButtonProps & { tooltipMsg: string }) {
    return (
        <Tooltip title={props.tooltipMsg}>
            <IconButton {...props}>
                <ExpandMoreIcon />
            </IconButton>
        </Tooltip>
    )
}

export default function PCard({ project, ...rest }: PCardProps) {

    const classes = useStyles();
    const history = useHistory();

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => setIsExpanded(!isExpanded);

    const parseCreatedOnToDate = (str: string) => {
        const date = new Date(parseInt(str));
        return date.toLocaleDateString();
    }

    const hasUpdates = project.updates && project.updates.length > 0;

    const firstUpdate = hasUpdates ? project.updates?.[0] : undefined;

    return (

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
                    <Typography variant="body1">
                        {firstUpdate.value}
                    </Typography>
                )}
            </CardContent>

            <CardActions className={classes.actions}>
                <ReadMoreIconButton onClick={() => history.push(SINGLE_PATH.replace(":id", project.id || ""))} />
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
    )
}
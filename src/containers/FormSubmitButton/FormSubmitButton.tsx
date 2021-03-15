import { Button, ButtonProps, makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        maxWidth: 300
    }
}));

interface Props extends ButtonProps {
    label: string
}

export function FormSubmitButton({ label, ...rest }: Props) {

    const classes = styles();

    return (
        <Button size="large" variant="contained" type="submit" color="primary" className={classes.root} {...rest}>{label}</Button>
    );

}
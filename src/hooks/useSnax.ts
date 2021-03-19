import {useContext} from "react";
import {SnackbarContext} from "../contexts/Snackbar";

export default function useSnax() {
    const {snack, setSnack} = useContext(SnackbarContext);
    return {snack, setSnack}
}
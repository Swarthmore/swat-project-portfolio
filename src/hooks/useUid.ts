import {useSelector} from "react-redux";
import {RootState} from "../store/reducer";

export default function useUid() {
    const { uid } = useSelector((state: RootState) => state.firebase.auth);
    return { uid }
}
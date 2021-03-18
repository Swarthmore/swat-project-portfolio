import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducer";

export default function useTeams() {
    useFirestoreConnect([
        {collection: "teams"}
    ]);
    const { teams } = useSelector((state:RootState) => state.firestore.ordered)
    return {
        loaded: isLoaded(teams),
        teams
    }
}
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducer";
import {useState, useEffect} from "react";
import {Project} from "../types";

export default function useProjectWithId(id: string) {

    const [project, setProject] = useState<Project|undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useFirestoreConnect([
        { collection: "projects", doc: id, storeAs: "project" }
    ]);

    const firestoreProject = useSelector((state: RootState) => state.firestore.data.project);

    useEffect(() => {
        if (isLoaded(firestoreProject)) {
            setLoading(false);
            setProject(firestoreProject);
        }
    }, [firestoreProject])

    return { project, loading }
}
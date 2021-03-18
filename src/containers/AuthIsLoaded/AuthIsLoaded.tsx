import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { isLoaded } from "react-redux-firebase";

export default function AuthIsLoaded({ children }: { children: JSX.Element }) {
    const auth = useSelector((state: RootState) => state.firebase.auth);
    if (!isLoaded(auth)) {
        return <>Loading...</>
    }
    return children;
}
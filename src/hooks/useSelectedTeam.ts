import {useLocation} from "react-router-dom";

export default function useResourceId() {
    const {pathname} = useLocation();
    // get the last part of the path
    const parts = pathname.split("/");
    return parts.pop();
}
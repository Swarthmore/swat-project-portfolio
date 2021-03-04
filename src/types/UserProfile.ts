import * as Rrf from "react-redux-firebase";

// TODO: make sure this is extending the correct interface
export interface UserProfile extends Rrf.UserProfile {
    id: string
}
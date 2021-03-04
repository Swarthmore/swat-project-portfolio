import { ProfileType } from "react-redux-firebase";

export interface UserProfile extends UserProfile {

    // an array of project ids
    projects: string[]

    // the id of the team that the user belongs to 
    team: string

}

// @note projects are owned by users, not by teams
export interface Project {

    // the id of the project
    id?: string;
    
    // the name of the project
    name: string;

    // a short description of the project, limited to 400 characters 
    description: string;

    // the full description of the project in markdown
    markdown?: string;

    // the timestamp of the project deadline
    deadline?: string;

    // an array of status updates for the project
    statusUpdates?: ProjectStatusUpdate[];

    // a color hex or rgb string that can be used as an accent color for the project
    color?: string;

    // meta data about the project
    meta: {

        // the uid of the owner of the project
        ownedBy: string;

        // the uid of the person that created the project
        createdBy: string;
        
        // the timestamp of when the project was created
        createdOn: string;

    }

}
  
export interface ProjectStatusUpdate {

    // the id of the user who posted the update
    postedBy: string;

    // the date string of when the update was made
    postedOn: string;

    // the update message
    message: string;

}

export interface Team {

    // the id of the team
    id: string

    // the name of the team
    name: string

}
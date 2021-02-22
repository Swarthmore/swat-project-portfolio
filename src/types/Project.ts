export interface Project {
    // the id of the project
    id?: string;
    // the uid of the owner of the project
    owner: string;
    // the name of the project
    name: string;
    // the short description of the project
    shortDescription: string;
    // the full description of the project in markdown
    description?: string;
    // an array of team ids associated with the project
    teams?: string[];
    // an array of user ids associated with the project
    members?: string[];
    // the timestamp of the project deadline
    deadline?: string;
    // an array of project status updates
    updates?: ProjectStatusUpdate[];
    // a color hex or rgb string
    color?: string;
    // the uid of the person that created the project
    createdBy: string;
    // the timestamp of when the project was created
    createdOn: string;
  }
  
  export interface ProjectStatusUpdate {
    // the id of the user who posted the update
    postedBy: string;
    // the date string of when the update was made
    postedOn: string;
    // the update message
    message: string;
  }
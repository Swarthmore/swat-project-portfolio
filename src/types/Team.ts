export interface Team {
    /* the id of the team */
    id: string
    /* the name of the team */
    name: string
    /* an array of user ids */
    members: string[]
    /* the uid of the owner */
    owner: string
    /* the datetime string for when the team was created */
    createdOn: string
}
// convert a firebase response to an array of the same object
export function convertResponseToArray(response: { [id:string]: unknown }) {
    return Object.keys(response).map(key => ({ id: key, ...response }));
}
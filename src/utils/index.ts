import {ProjectStatusUpdate} from "../types";

export function createMeta(createdBy: string) {
    return {
        createdBy,
        createdOn: Date.now().toString(),
        visible: true
    }
}

export function dateString(timestamp: string) {
    const date = new Date(+timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

export function sortUpdates(updates: ProjectStatusUpdate[]) {
    return Array.from(updates).sort((first, second) => (+second.createdOn - +first.createdOn));
}
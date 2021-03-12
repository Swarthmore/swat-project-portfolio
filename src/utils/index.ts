export function createMeta(createdBy: string)
{
    return {
        createdBy,
        createdOn: Date.now().toString(),
        visible: true
    }
}

export function dateString(timestamp: string)
{
    const date = new Date(+timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
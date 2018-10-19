const idRegExp = /(\d+)\/$/;

export function getIdFromUrl(url: string): number {
    const matches = url.match(idRegExp);

    const id = matches[1];

    if (!id) {
        return null;
    }

    return +id;
}

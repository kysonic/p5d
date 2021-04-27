export function parseHash(hash: string) {
    return Object.fromEntries([
        ...hash
            .replace('#', '')
            .split('&')
            .map((str) => str.split('=')),
    ]);
}

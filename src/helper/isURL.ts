export function isURL(value: string): boolean {
    if (value.startsWith("https://")) {
        return true;
    }
    return false;
}
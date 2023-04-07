export function isURL(value: string): boolean {
    try {
        new URL(value);
    }
    catch {
        return false;
    }
    return true;
}
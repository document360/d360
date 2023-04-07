import ciDetect from "@npmcli/ci-detect";
import { ciNames } from "../constants";

export function isCI() {
    return ciDetect();
}

export function getCIName(): string {
    const ciName = ciDetect();
    if (ciName)
        return ciNames[ciName];
    return null;
}
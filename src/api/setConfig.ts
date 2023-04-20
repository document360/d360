import configStore from "./config-store";

export function setApiHubUrl(apihubUrl: string) {
    process.env.D360_APIHUB_URL = apihubUrl;
    configStore.set("apihubUrl", apihubUrl);
}

export function setAPIKey(apiKey: string) {
    process.env.D360_API_KEY = apiKey;
    configStore.set("apiKey", apiKey);
}

export function setUserId(userId: string) {
    process.env.D360_USER_ID = userId;
    configStore.set("userId", userId);
}
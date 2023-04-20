import config from "config";
import fetch, { Headers, RequestInit } from "node-fetch";
import { error } from "../helper/consoleWrapper";
import { getApiHubUrl } from "./getConfig";
import { ApiResponse } from "../models/api-response";

export default async function d360APIFetch<T>(
    path: string,
    options: RequestInit = { headers: new Headers() },

): Promise<T> {
    const currentEnvironment = getApiHubUrl();
    const baseUrl = currentEnvironment ?? config.get("env.eu_baseUrl");
    const url = `${baseUrl}${path}`;
    let headers = options.headers as Headers;
    if (!(options.headers instanceof Headers)) {
        headers = new Headers(options.headers);
    }
    return fetch(url, {
        ...options,
        headers
    }).then(response => {
        if (!response.ok) {
            response.text().then(responseText => {
                if (response.status == 401) {
                    error(`Error 401: Unauthorized. ${responseText}`);
                } else {
                    const parsedResponse = JSON.parse(responseText) as ApiResponse<T>;
                    error(`Error ${response.status}: ${response.statusText} ${parsedResponse.errors[0].description}`);
                }
            });
            return;
        }
        return response.json() as Promise<T>;
    });
}
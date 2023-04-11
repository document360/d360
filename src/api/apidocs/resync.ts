import FormData from "form-data";
import fs from 'fs';
import { Headers } from "node-fetch";
import ora from "ora";
import { getCIName } from "../../helper/isCI";
import { isURL } from "../../helper/isURL";
import { ApiReferenceOperationType, ApiReferenceSourceType, ResyncCommandOptions } from "../../models";
import d360APIFetch from "../d360APIFetch";
import { ApiResponse } from "../../models/api-response";
import { ImportApiReferenceSummary } from "../../models/import.model";
import { error, success } from "../../helper/consoleWrapper";

export default async function resyncFlow(options: ResyncCommandOptions) {
    console.log
    const spinner = ora({ text: 'Resyncing..' });
    spinner.start();
    const formData = getResyncRequestFormData(options);
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'api_token': options.apiKey
        })
    };
    let requestUrl = `/v2/apidocs/${options.apiReferenceId}/resync/${options.userId}`;
    if (options.publish) {
        requestUrl += `/?publishArticles=true`;
    }
    const response = await d360APIFetch<ApiResponse<ImportApiReferenceSummary>>(requestUrl, requestOptions);
    spinner.stop();
    handleResyncResponse(response);
}

function getResyncRequestFormData(options: ResyncCommandOptions) {
    const formData = new FormData();
    if (!isURL(options.path)) {
        const stream = fs.createReadStream(options.path);
        formData.append("file", stream);
    }
    else {
        formData.append("url", options.path);
    }
    formData.append("apiReferenceId", options.apiReferenceId);
    formData.append("sourceType", ApiReferenceSourceType.CommandLine);
    formData.append("operationType", ApiReferenceOperationType.Resync);
    formData.append("ciName", getCIName() ?? "command-line");
    if (options.force) {
        formData.append("proceedAnyway", "true");
    }
    return formData;
}

function handleResyncResponse(response: ApiResponse<ImportApiReferenceSummary>) {
    if (response?.success) {
        const importWarnings = response?.result?.warnings;
        const importErrors = response?.result?.errors;
        if (importErrors == null && importWarnings == null) {
            success("Resync Successful!");
        }
        else if (importWarnings.length > 0 && importErrors.length > 0) {
            error(`Resync failed! We found around ${importWarnings.length} warnings and ${importErrors.length} errors. You can use --force=true to force import your spec file`);
        }
        else if (importWarnings.length > 0) {
            error(`Resync failed! We found around ${importWarnings.length} warnings. You can use --force=true to force import your spec file`);
        }
        else if (importErrors.length > 0) {
            error(`Resync failed! We found around ${importErrors.length} errors. You can use --force=true to force import your spec file`);
        }
    }
}
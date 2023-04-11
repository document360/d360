//import chalk from "chalk";
import FormData from "form-data";
import fs from 'fs';
import { Headers } from "node-fetch";
import ora from "ora";
import { error, success } from "../../helper/consoleWrapper";
import { getCIName } from "../../helper/isCI";
import { isURL } from "../../helper/isURL";
import { ApiReferenceOperationType, ApiReferenceSourceType, ImportCommandOptions } from "../../models";
import { ApiResponse } from "../../models/api-response";
import { ImportApiReferenceSummary } from "../../models/import.model";
import d360APIFetch from "../d360APIFetch";


export default async function importFlow(options: ImportCommandOptions) {
    const spinner = ora({ text: 'Importing..' });
    spinner.start();
    const formData = getImportRequestFormData(options);
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'api_token': options.apiKey
        })
    };
    let requestUrl = `/v2/apidocs/import/${options.userId}`;
    if (options.publish) {
        requestUrl += `/?publishArticles=true`;
    }
    const response = await d360APIFetch<ApiResponse<ImportApiReferenceSummary>>(requestUrl, requestOptions);
    spinner.stop();
    handleImportResponse(response);
}

function getImportRequestFormData(options: ImportCommandOptions) {
    const formData = new FormData();
    if (!isURL(options.path)) {
        const stream = fs.createReadStream(options.path);
        formData.append("file", stream);
    }
    else {
        formData.append("url", options.path);
    }
    formData.append("projectVersionId", options.versionId);
    formData.append("sourceType", ApiReferenceSourceType.CommandLine);
    formData.append("operationType", ApiReferenceOperationType.Import);
    formData.append("ciName", getCIName() ?? 'command-line');
    if (options.force) {
        formData.append("proceedAnyway", "true");
    }
    return formData;
}

function handleImportResponse(response: ApiResponse<ImportApiReferenceSummary>) {
    if (response?.success) {
        const importWarnings = response?.result?.warnings;
        const importErrors = response?.result?.errors;
        if (importErrors == null && importWarnings == null) {
            success("Import Successful!");
        }
        else if (importWarnings.length > 0 && importErrors.length > 0) {
            error(`Import failed! We found around ${importWarnings.length} warnings and ${importErrors.length} errors. You can use --force=true to force import your spec file`);
        }
        else if (importWarnings.length > 0) {
            error(`Import failed! We found around ${importWarnings.length} warnings. You can use --force=true to force import your spec file`);
        }
        else if (importErrors.length > 0) {
            error(`Import failed! We found around ${importErrors.length} errors. You can use --force=true to force import your spec file`);
        }
    }
}
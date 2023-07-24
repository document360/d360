import FormData from "form-data";
import fs from "fs";
import { Headers } from "node-fetch";
import ora from "ora";
import { getCIName } from "../../helper/isCI";
import { isURL } from "../../helper/isURL";
import { ApiReferenceOperationType, ApiReferenceSourceType, ResyncCommandOptions } from "../../models";
import d360APIFetch from "../d360APIFetch";
import { ApiResponse } from "../../models/api-response";
import { ImportApiReferenceSummary } from "../../models/import.model";
import { error, success, warning } from "../../helper/consoleWrapper";

export default async function resyncFlow(options: ResyncCommandOptions) {
  const spinner = ora({ text: "Resyncing.." });
  spinner.start();
  const formData = getResyncRequestFormData(options);
  const requestOptions = {
    method: "POST",
    body: formData,
    headers: new Headers({
      api_token: options.apiKey,
    }),
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
  } else {
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
    const isServersAvailable = response?.result?.is_server_available;
    if (importErrors == null && importWarnings == null) {
      success("Resync Successful!");
    } else if (isServersAvailable != true && importWarnings.length < 1 && importErrors.length < 1) {
      showServerUnAwailableWarning(true);
    } else if (importWarnings.length > 0 && importErrors.length > 0) {
      error(
        `Resync failed! We found ${importWarnings.length} alert(s) and ${importErrors.length} errors. You can use --force to force import your spec file`
      );
      if (isServersAvailable == false) {
        showServerUnAwailableWarning(false);
      }
    } else if (importWarnings.length > 0) {
      error(`Resync failed! We found ${importWarnings.length} alert(s). You can use --force to force import your spec file`);
      if (isServersAvailable == false) {
        showServerUnAwailableWarning(false);
      }
    } else if (importErrors.length > 0) {
      error(`Resync failed! We found ${importErrors.length} errors. You can use --force to force import your spec file`);
      if (isServersAvailable == false) {
        showServerUnAwailableWarning(false);
      }
    }
  }
}
function showServerUnAwailableWarning(withForceInfo: boolean) {
  if (withForceInfo) {
    warning(
      "You may not be able to use try-it feature. Looks like server variables aren’t defined in your OpenAPI Specification file. You can use --force to force import your spec file"
    );
  } else {
    warning("You may not be able to use try-it feature. Looks like server variables aren't defined in your OpenAPI Specification file.");
  }
}
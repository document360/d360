//import chalk from "chalk";
import FormData from "form-data";
import fs from "fs";
import { Headers } from "node-fetch";
import ora from "ora";
import { error, heading, success, warning } from "../../helper/consoleWrapper";
import { isURL } from "../../helper/isURL";
import { ValidateCommandOptions } from "../../models";
import { ApiResponse } from "../../models/api-response";
import { ImportApiReferenceSummary } from "../../models/import.model";
import d360APIFetch from "../d360APIFetch";

export default async function validateFlow(options: ValidateCommandOptions) {
  const spinner = ora({ text: "Validating.." });
  spinner.start();
  const formData = getImportRequestFormData(options);
  const requestOptions = {
    method: "POST",
    body: formData,
    headers: new Headers({
      api_token: options.apiKey,
    }),
  };
  const requestUrl = `/v2/apidocs/validate`;
  const response = await d360APIFetch<ApiResponse<ImportApiReferenceSummary>>(requestUrl, requestOptions);
  spinner.stop();
  handleValidateResponse(response);
}

function getImportRequestFormData(options: ValidateCommandOptions) {
  const formData = new FormData();
  if (!isURL(options.path)) {
    const stream = fs.createReadStream(options.path);
    formData.append("file", stream);
  } else {
    formData.append("url", options.path);
  }
  return formData;
}

function showAlerts(importWarnings) {
  heading("\n");
  heading("Here are the alert(s) found in the OpenAPI spec file.");
  for (let i = 0; i < importWarnings.length; i++) {
    warning("Message :" + importWarnings[i]["message"] + "\n" + "Path :" + importWarnings[i]["pointer"] + "\n");
  }
}
function showErrors(importErrors) {
  heading("Here are the errors found in the OpenAPI spec file.");
  for (let i = 0; i < importErrors.length; i++) {
    error("Message :" + importErrors[i]["message"] + "\n" + "Path :" + importErrors[i]["pointer"] + "\n");
  }
}
function handleValidateResponse(response: ApiResponse<ImportApiReferenceSummary>) {
  if (response?.success) {
    const importWarnings = response?.result?.warnings;
    const importErrors = response?.result?.errors;
    if (importErrors == null && importWarnings == null) {
      success("Validation successful no error found..!");
    } else if (importWarnings.length > 0 && importErrors.length > 0) {
      showAlerts(importWarnings);
      showErrors(importErrors);
      error(`Validation failed! We found ${importWarnings.length} alert(s) and ${importErrors.length} errors.`);
    } else if (importWarnings.length > 0) {
      showAlerts(importWarnings);
      warning(`Validation failed! We found ${importWarnings.length} alert(s).`);
    } else if (importErrors.length > 0) {
      showErrors(importErrors);
      error(`Validation failed! We found ${importErrors.length} errors.`);
    }
  }
}

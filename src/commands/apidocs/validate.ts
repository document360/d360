import prompts from "prompts";
import findOasFilesInCurrentDirectory from "../../api/initOas";
import { CommandCategories } from "../../constants";
import { isCI } from "../../helper/isCI";

import { ValidateCommandOptions } from "../../models";
import BaseCommand from "../baseCommand";
import validateFlow from "../../api/apidocs/validate";

export default class ValidateCommand extends BaseCommand {
  constructor() {
    super();

    this.command = "apidocs:validate";
    this.description = "Validate your OpenAPI definition file";
    this.commandCategory = CommandCategories.apidocs;
    this.usage = "apidocs:validate [options]";
    this.args = [
      {
        name: "apiKey",
        type: String,
        description: "Project API Key",
      },
      {
        name: "apihubUrl",
        type: String,
        description: "APIHUB Base URL. The default value for this parameter is 'https://apihub.document360.io'",
      },
      {
        name: "path",
        type: String,
        description: "File path of your respective API Reference",
      },
    ];
  }
  async run(options?: ValidateCommandOptions): Promise<string> {
    await super.run(options);
    if (!isCI()) {
      if (!options.path) options.path = await findOasFilesInCurrentDirectory();
    } 
    prompts.override(options);
    await validateFlow(options);
    return Promise.resolve("");
  }
}

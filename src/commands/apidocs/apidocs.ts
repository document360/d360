import prompts from "prompts";
import importFlow from "../../api/apidocs/import";
import findOasFilesInCurrentDirectory from "../../api/initOas";
import { CommandCategories } from "../../constants";
import { isCI } from "../../helper/isCI";
import terminalWrapper from "../../helper/terminalWrapper";
import { ImportCommandOptions } from "../../models";
import BaseCommand from "../baseCommand";

export default class APIDocsCommand extends BaseCommand {
    constructor() {
        super();

        this.command = "apidocs";
        this.description = "Import your OpenAPI definition to Document360";
        this.commandCategory = CommandCategories.apidocs;
        this.usage = "apidocs [options]";
        this.args = [
            {
                name: "apiKey",
                type: String,
                description: "Project API Key",
            },
            {
                name: "userId",
                type: String,
                description: "User Id that's used to generate API Docs",
            },
            {
                name: "versionId",
                type: String,
                description: "Project Version Id",
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
            {
                name: "force",
                type: Boolean,
                description:
                    "Force resync your API Reference. It will resync even if there are errors or warnings present within your specification files",
            },
            {
                name: "publish",
                type: Boolean,
                description: "Publish articles after resync. By default, all the articles will be in draft state after resync",
            },
        ];
    }
    async run(options?: ImportCommandOptions): Promise<string> {
        await super.run(options);
        if (!isCI()) {
            if (!options.versionId) {
                const versionIdAnswer = await terminalWrapper([
                    {
                        type: "text",
                        name: "versionId",
                        message: "Enter project document version id",
                    },
                ]);
                options.versionId = versionIdAnswer.versionId;
            }
            if (!options.path) options.path = await findOasFilesInCurrentDirectory();
        } else {
            if (!options.versionId) throw new Error("versionId parameter not found. Please provide --versionId");
            if (!options.path) options.path = await findOasFilesInCurrentDirectory();
        }
        prompts.override(options);
        await importFlow(options);
        return Promise.resolve("");
    }
}

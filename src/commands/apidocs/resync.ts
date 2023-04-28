import prompts from "prompts";
import resyncFlow from "../../api/apidocs/resync";
import findOasFilesInCurrentDirectory from "../../api/initOas";
import { CommandCategories } from "../../constants";
import { isCI } from "../../helper/isCI";
import terminalWrapper from "../../helper/terminalWrapper";
import { ResyncCommandOptions } from "../../models";
import BaseCommand from "../baseCommand";

export default class ResyncCommand extends BaseCommand {
    constructor() {
        super();
        this.command = "apidocs:resync";
        this.description = "Resync your OpenAPI definition to Document360";
        this.commandCategory = CommandCategories.apidocs;
        this.usage = "apidocs:resync [options]";
        this.args = [
            {
                name: "apiKey",
                type: String,
                description: "Project API Key"
            },
            {
                name: "userId",
                type: String,
                description: "User Id that's used to generate API Docs"
            },
            {
                name: "apiReferenceId",
                type: String,
                description: "API Reference Id to resync",
            },
            {
                name: "apihubUrl",
                type: String,
                description: "APIHUB Base URL. The default value for this parameter is 'https://apihub.document360.io'"
            },
            {
                name: "path",
                type: String,
                description: "File path of your respective API Reference"
            },
            {
                name: "force",
                type: Boolean,
                description: "Force import your API Reference. It will import even if there are errors or warnings present within your specification files."
            },
            {
                name: "publish",
                type: Boolean,
                description: "Publish articles after import. By default, all the articles will be in draft state after import"
            }
        ]
    }
    async run(options?: ResyncCommandOptions): Promise<string> {
        await super.run(options);
        if (!isCI()) {
            if (!options.apiReferenceId) {
                const apiReferenceAnswer = await terminalWrapper([
                    {
                        type: 'text',
                        name: 'apiReferenceId',
                        message: 'Enter API Reference Id',
                    }
                ]);
                options.apiReferenceId = apiReferenceAnswer.apiReferenceId;
            }
            if (!options.path)
                options.path = await findOasFilesInCurrentDirectory();
        }
        else {
            if (!options.apiReferenceId)
                throw new Error("apiReferenceId parameter not found. Please provide --apiReferenceId");
            if (!options.path)
                options.path = await findOasFilesInCurrentDirectory();
        }
        prompts.override(options);
        await resyncFlow(options);
        return Promise.resolve("");
    }
}
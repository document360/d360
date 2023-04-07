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
                description: "Your apikey"
            },
            {
                name: "userId",
                type: String,
                description: "The userId used for importing the API Docs"
            },
            {
                name: "apiReferenceId",
                type: String,
                description: "Provide the API Reference Id which you would like to resync",
            },
            {
                name: "apihubUrl",
                type: String,
                description: "Enter the apihub url"
            },
            {
                name: "path",
                type: String,
                description: "File path / URL"
            },
            {
                name: "force",
                type: String,
                description: "Force import your spec file"
            },
            {
                name: "publish",
                type: String,
                description: "Publish your articles to your knowledge base site"
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
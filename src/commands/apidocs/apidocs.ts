import prompts from 'prompts';
import importFlow from '../../api/apidocs/import';
import findOasFilesInCurrentDirectory from '../../api/initOas';
import { CommandCategories } from '../../constants';
import { isCI } from '../../helper/isCI';
import terminalWrapper from '../../helper/terminalWrapper';
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
                description: "Your apikey"
            },
            {
                name: "userId",
                type: String,
                description: "The userId used for importing the API Docs"
            },
            {
                name: "versionId",
                type: String,
                description: "API documentation project version Id",
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
    async run(options?: ImportCommandOptions): Promise<string> {
        await super.run(options);
        if (!isCI()) {
            if (!options.versionId) {
                const versionIdAnswer = await terminalWrapper([
                    {
                        type: 'text',
                        name: 'versionId',
                        message: 'Enter project document version id',
                    }
                ]);
                options.versionId = versionIdAnswer.versionId;
            }
            if (!options.path)
                options.path = await findOasFilesInCurrentDirectory();
        }
        else {
            if (!options.versionId)
                throw new Error("versionId parameter not found. Please provide --versionId");
            if (!options.path)
                options.path = await findOasFilesInCurrentDirectory();
        }
        prompts.override(options);
        await importFlow(options);
        return Promise.resolve("");
    }
}
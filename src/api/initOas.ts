
import ora from 'ora';
import { isCI } from '../helper/isCI';
import readDirectory from '../helper/readDirectory';
import terminalWrapper from '../helper/terminalWrapper';


export default async function findOasFilesInCurrentDirectory(
) {
    const isFindingFiles = ora({ text: 'Looking for json/yaml files..' }).start();

    const allFilesFromDirectory = await readDirectory(".");
    const specFiles = allFilesFromDirectory.filter(file => file.endsWith(".json") || file.endsWith(".yaml"));
    if (specFiles.length == 0)
        throw new Error("No spec files found in the current directory. Please use --path to mention the file path/ URL of your OAS Spec file.")
    isFindingFiles.stop();
    if (!isCI()) {
        const selectedFile = await terminalWrapper({
            name: 'file',
            message: 'Choose any one of the spec files listed below',
            type: 'select',
            choices: specFiles.map(file => ({
                title: file,
                value: file,
            }))
        });
        return selectedFile.file;
    }
    return specFiles[0];
}
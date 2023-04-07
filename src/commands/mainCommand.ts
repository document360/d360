import chalk from 'chalk';
import usage, { Section } from 'command-line-usage';
import { AllCommandDetails } from '../constants';
import { Command } from '../models';
import APIDocsCommand from "./apidocs/apidocs";
import ResyncCommand from './apidocs/resync';
import BaseCommand from "./baseCommand";

export const commands = {
    'apidocs': APIDocsCommand,
    'apidocs:resync': ResyncCommand
}

export function load(command: keyof typeof commands) {
    if (!(command in commands)) {
        throw new Error('Command not found.');
    }
    return new commands[command]();
}

export function loadGlobalHelpCommand() {
    const helpContent: Section[] = [
        {
            header: chalk.underline('Usage'),
            content: `d360 <command> [arguments]`
        },
    ]
    setAllCommandCategories();
    AllCommandDetails.forEach(command => {
        helpContent.push({
            header: chalk.underline(command.decsription),
            content: getSubCommandDetails(command.commands)
        })
    });
    return usage(helpContent);
}

export function loadHelpCommand(command: BaseCommand) {
    const helpContent: Section[] = [
        {
            content: command.description,
            raw: true
        },
        {
            header: chalk.underline('Usage'),
            content: `d360 ${command.usage}`
        },
        {
            header: chalk.underline("Options"),
            optionList: command.args
        }
    ]
    return usage(helpContent);
}


function setAllCommandCategories() {
    Object.entries(commands).forEach(currentCommand => {
        const command = new currentCommand[1]();
        const commandDetail = AllCommandDetails.find(commandDetail => commandDetail.commandCategoryName == command.commandCategory);
        commandDetail.commands.push({ name: command.command, description: command.description });
    });
}

function getSubCommandDetails(commands: Command[]) {
    return commands.map(command => {
        return {
            name: `${chalk.grey('$')} d360 ${command.name}`,
            description: command.description
        }
    })
}



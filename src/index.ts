import path from "path";

import cliArgs from "command-line-args";

const directory = process.env.NODE_CONFIG_DIR;
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../config");

import { getApiHubUrl, getAPIKey, getUserId } from "./api/getConfig";
import BaseCommand from "./commands/baseCommand";
import { load, loadGlobalHelpCommand, loadHelpCommand } from "./commands/mainCommand";
import { DefaultMainArgs } from "./constants";
import { CommandDefaultOptions } from "./models";
import { setApiHubUrl } from "./api/setConfig";
import pkg from "../package.json";
const { version } = pkg;
process.env.NODE_CONFIG_DIR = directory;
// Uncomment below while running via localhost api
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default function d360(processArgs: NodeJS.Process["argv"]) {
  const argsFromCli = cliArgs(DefaultMainArgs, { partial: true, argv: processArgs });
  const argsCommand = argsFromCli.command || false;
  let command = argsCommand || "";
  if (
    typeof argsFromCli._unknown !== "undefined" &&
    argsFromCli._unknown.length === 0 &&
    (argsCommand === "version" || argsCommand === "v")
  ) {
    argsFromCli.version = true;
  }
  if (argsFromCli.version && (!command || command === "help")) return Promise.resolve(version);
  if (!command) {
    command = "help";
  }
  if (command == "help") {
    argsFromCli.help = true;
  }
  try {
    if (command == "help") {
      return Promise.resolve(loadGlobalHelpCommand());
    }
    const currentCommand: BaseCommand = load(command);
    if (argsFromCli.help) {
      return Promise.resolve(loadHelpCommand(currentCommand));
    }
    const currentCommandArgs = cliArgs(currentCommand.args, { argv: argsFromCli._unknown || [] }) as CommandDefaultOptions;
    if (!currentCommandArgs.apiKey) currentCommandArgs.apiKey = getAPIKey();
    if (!currentCommandArgs.apihubUrl) {
      currentCommandArgs.apihubUrl = getApiHubUrl();
    } else {
      setApiHubUrl(currentCommandArgs.apihubUrl);
    }
    if (!currentCommandArgs.userId) currentCommandArgs.userId = getUserId();
    return currentCommand.run(currentCommandArgs).then((currentCommandArgs: string) => {
      return currentCommandArgs;
    });
  } catch (exception) {
    return Promise.reject(exception);
  }
}

import { OptionDefinition } from "command-line-usage";

import configStore from "../api/config-store";
import { CommandCategories, Messages } from "../constants";
import { error } from "../helper/consoleWrapper";
import { isCI } from "../helper/isCI";
import terminalWrapper from "../helper/terminalWrapper";
import { CommandDefaultOptions } from "../models";
import { commands } from "./mainCommand";

export default class BaseCommand {
  args: OptionDefinition[];
  description: string;
  usage: string;
  commandCategory: CommandCategories;
  command: keyof typeof commands;
  /*
    The arguments that are required for all commands and that doesn't have a default value, 
    we should validate it in the base command
  */
  async run(options: CommandDefaultOptions): Promise<string> {
    if (!options.apiKey)
      await this.getApiKey(options);
    if (!options.userId)
      await this.getUserId(options);
    return Promise.resolve("");
  }

  private async getApiKey(options: CommandDefaultOptions) {
    if (!isCI()) {
      error(Messages.apiKeyNotFound);
      const apiKeyAnswer = await terminalWrapper([
        {
          type: 'text',
          name: 'apiKey',
          message: 'Enter your API Key',
        }
      ]);
      if (apiKeyAnswer.apiKey) {
        options.apiKey = apiKeyAnswer.apiKey;
        configStore.set('apiKey', apiKeyAnswer.apiKey);
      }
    }
    else {
      throw new Error(Messages.apiKeyNotFoundInCI);
    }
  }

  private async getUserId(options: CommandDefaultOptions) {
    console.log(options.userId);
    if (!isCI()) {
      error(Messages.userIdNotFound);
      const apiKeyAnswer = await terminalWrapper([
        {
          type: 'text',
          name: 'userId',
          message: 'Enter user Id',
        }
      ]);
      if (apiKeyAnswer.userId) {
        options.userId = apiKeyAnswer.userId;
        configStore.set('userId', apiKeyAnswer.userId);
      }
    }
    else {
      throw new Error(Messages.apiKeyNotFoundInCI);
    }
  }
}



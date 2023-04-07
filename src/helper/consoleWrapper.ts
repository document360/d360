import chalk from "chalk";

function error(message: string) {
    return console.error(chalk.red(message));
}

function info(message: string) {
    return console.warn(chalk.blue(message));
}

function success(message: string) {
    return console.log(chalk.green(message));
}

export { error, info, success };
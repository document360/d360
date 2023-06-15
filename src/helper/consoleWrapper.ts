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

function warning(message: string) {
  return console.warn(chalk.yellow(message));
}
function heading(message: string) {
  return console.warn(chalk.white(message));
}

export { error, info, success, heading, warning };
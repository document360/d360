import chalk from "chalk";
import d360 from ".";

d360(process.argv.slice(2))
    .then((message: string) => {
        if (message) {
            console.log(message);
        }
    }).catch((error: Error) => {
        console.error(chalk.red(`\n${error.message}\n`));
        return process.exit(1);
    });


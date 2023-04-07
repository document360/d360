import prompts from 'prompts';
import { isCI } from './isCI';

export default async function terminalWrapper<T extends string = string>(
    questions: prompts.PromptObject<T> | prompts.PromptObject<T>[],
    options?: prompts.Options
): Promise<prompts.Answers<T>> {
    const onCancel = () => {
        process.stdout.write('\n');
        process.stdout.write('Thanks for using d360!');
        process.stdout.write('\n\n');
        process.exit(1);
    };

    function onRender() {
        if (isCI()) {
            process.stdout.write('\n');
            process.stdout.write(
                'We were about to prompt you for something in a CI environment. Are you missing an argument?'
            );
            process.stdout.write('\n\n');
            process.stdout.write('Try running `d360 <command> --help` or contact support@document360.io');
            process.stdout.write('\n\n');
            process.exit(1);
        }
    }

    if (Array.isArray(questions)) {
        questions = questions.map(question => ({ onRender, ...question }));

    } else {
        questions.onRender = onRender;
    }

    return prompts(questions, { onCancel, ...options });

}
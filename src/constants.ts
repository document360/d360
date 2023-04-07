import { OptionDefinition } from "command-line-args";
import { CommandCategoryDetails } from "./models";

export const DefaultMainArgs: OptionDefinition[] = [
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'command', type: String, defaultOption: true }
];

export const Messages = {
    apiKeyNotFound: "🗝️ API Key not found",
    apiKeyNotFoundInCI: "🗝️ API Key not found. Please use --apiKey",
    userIdNotFound: "👨‍💻 User Id not found",
    userIdNotFoundInCI: "👨‍💻 User Id not found. Please use --userId"
}

export const AllCommandDetails: CommandCategoryDetails[] = [
    {
        commandCategoryName: "apidocs",
        decsription: "API Documentation",
        commands: []
    }
]

export const ciNames = {
    'aws-codebuild': 'AWS CodeBuild',
    'azure-pipelines': 'Azure Pipelines',
    'bamboo': 'Bamboo',
    'bitbucket-pipelines': 'Bitbucket Pipelines',
    'bitrise': 'Bitrise',
    'buddy': 'Google Cloud Builder',
    'buildkite': 'Buildkite',
    'circleci': 'Circle-CI',
    'cirrus': 'Cirrus CI',
    'codeship': 'CodeShip',
    'custom': 'Custom',
    'drone': 'Drone',
    'dsari': 'dsari CI',
    'gerrit': 'gerrit',
    'github-actions': 'GitHub Actions',
    'gitlab': 'GitLab',
    'gocd': 'GoCD',
    'heroku': 'Heroku',
    'hudson': 'Hudson CI',
    'jenkins': 'jenkins',
    'magnum': 'Magnum CI',
    'netlify': 'Netlify',
    'nevercode': 'Nevercode',
    'now': "Zeit.co's Now service, but not GitHub/BitBucket/GitLab",
    'now-bitbucket': "Zeit.co's Now for BitBucket deployment service",
    'now-github': "Zeit.co's Now for GitHub deployment service",
    'now-gitlab': "Zeit.co's Now for GitLab deployment service",
    'render': 'Render CI',
    'sail': 'Sail CI',
    'screwdriver': 'Screwdriver CI',
    'semaphore': 'Semaphore',
    'shippable': 'Shippable',
    'strider': 'Strider CI',
    'taskcluster': 'Mozilla Taskcluster',
    'tddium': 'TDDium',
    'teamcity': 'TeamCity',
    'travis-ci': 'Travis-CI',
    'vercel': 'Vercel',
    'vercel-bitbucket': 'Vercel Bitbucket',
    'vercel-github': 'Vercel GitHub',
    'vercel-gitlab': 'Vercel Gitlab',
    'wercker': 'Oracle Wercker',
    'woodpecker': 'Woodpecker CI'
}

export enum CommandCategories {
    apidocs = "apidocs"
}
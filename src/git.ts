import * as vscode from 'vscode';
import {execSync} from 'child_process';

const GET_CURRENT_BRANCH = 'git rev-parse --abbrev-ref HEAD';
const CREATE_NEW_BRANCH = 'git checkout -b';
const CHECKOUT_TO_BRANCH = 'git checkout';
const CHECK_WORKING_TREE_STATUS = 'git status --porcelain';

type CommandOptions =
    | typeof GET_CURRENT_BRANCH
    | typeof CREATE_NEW_BRANCH
    | typeof CHECKOUT_TO_BRANCH
    | typeof CHECK_WORKING_TREE_STATUS;

function executeGitCommand(command: CommandOptions, ...args: string[]) {
    if (!vscode.workspace.workspaceFolders) {
        return 'No workspace path provided';
    }

    const rootProjectPath = vscode.workspace.workspaceFolders[0].uri.path;

    try {
        process.chdir(rootProjectPath);
        return execSync(`${command} ${args.join(' ')}`)
            .toString()
            .trim();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const gitCommands = {
    getCurrentBranch: () => executeGitCommand(GET_CURRENT_BRANCH),
    createBranch: (name: string) => executeGitCommand(CREATE_NEW_BRANCH, name),
    checkoutToBranch: (name: string) => executeGitCommand(CHECKOUT_TO_BRANCH, name),
    isWorkingTreeClean: () => {
        const result = executeGitCommand(CHECK_WORKING_TREE_STATUS);
        return !result;
    },
};

export default gitCommands;

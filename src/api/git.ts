import * as vscode from 'vscode';
import {execSync} from 'child_process';

const executeGitCommand = (command: string) => {
    if (!vscode.workspace.workspaceFolders) {
        return 'No workspace path provided';
    }

    process.chdir(vscode.workspace.workspaceFolders[0].uri.path);
    return execSync(command)
        .toString()
        .trim();
};

export const getCurrentBranch = () => executeGitCommand('git rev-parse --abbrev-ref HEAD');
export const createBranch = (name: string) => executeGitCommand(`git checkout -b ${name}`);
export const checkoutToBranch = (name: string) => executeGitCommand(`git checkout ${name}`);
export const isWorkingTreeClean = () => !executeGitCommand('git status --porcelain');

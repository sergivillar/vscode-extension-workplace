import * as vscode from 'vscode';
import {getCurrentBranch, createBranch} from '../api/git';
import {getTicket} from '../api/jira';
import settings from '../settings';
import {taskProvider} from '../views/tasks';
import {ITask, TASK_STATUS_WIP} from '../nodes';

const createTask = (context: vscode.ExtensionContext) => async () => {
    const {username} = settings;
    const jiraTicket = await vscode.window.showInputBox({
        placeHolder: 'Enter your Jira ticket (e.g ACCOUNT-XXXX)',
        // TODO remove this when finish extension
        value: 'ACCOUNT-7651',
        ignoreFocusOut: true,
    });
    if (!jiraTicket) {
        return vscode.window.showErrorMessage('You should provide your JIRA ticket');
    }
    try {
        const currentBranch = getCurrentBranch();
        if (currentBranch !== 'master') {
            return vscode.window.showErrorMessage(
                'Please go to branch master (save all you work before start a new feature :P)'
            );
        }

        const {
            id,
            key,
            fields: {summary, description},
        } = await getTicket(jiraTicket, settings.authToken);
        const branchNameSuggested = `${username}-${key}-${summary.replace(/ /g, '-')}`;
        const branchName = await vscode.window.showInputBox({
            value: branchNameSuggested,
            ignoreFocusOut: true,
        });
        if (!branchName) {
            return vscode.window.showErrorMessage('A new branch name should be provided');
        }
        createBranch(branchName);
        const dataToSave: ITask = {
            status: TASK_STATUS_WIP,
            branchName,
            tickets: {
                main: {id: Number(id), key, name: jiraTicket, description},
                related: [],
            },
            createdAt: Date.now(),
        };

        await context.workspaceState.update('tasks', [dataToSave]);
        taskProvider.refresh();
        vscode.window.showInformationMessage(`Your new branch ${branchName} has been created`);
    } catch (error) {
        console.error(error);
        return vscode.window.showErrorMessage("There's any problem creating the new feature.");
    }
};

export default createTask;

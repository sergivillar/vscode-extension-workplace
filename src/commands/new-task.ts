import * as vscode from 'vscode';
import settings from '../settings';
import api from '../api';
import git from '../git';
import {Task, TASK_STATUS_WIP} from '../model';
import {taskProvider} from '../views/tasks';

function createTask(context: vscode.ExtensionContext): (...args: any[]) => any {
    return async () => {
        const {username} = settings.getSettings();
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
            const {data} = await api.fetchJiraTicket(jiraTicket);
            const currentBranch = git.getCurrentBranch();
            if (currentBranch !== 'master') {
                return vscode.window.showErrorMessage(
                    'Please go to branch master (save all you work before start a new feature :P)'
                );
            }
            const {
                id,
                key,
                fields: {summary, description},
            } = data;
            const branchNameSuggested = `${username}-${key}-${summary.replace(/ /g, '-')}`;
            const branchName = await vscode.window.showInputBox({
                value: branchNameSuggested,
                ignoreFocusOut: true,
            });
            if (!branchName) {
                return vscode.window.showErrorMessage('A new branch name should be provided');
            }
            git.createBranch(branchName);
            const dataToSave: Task = {
                status: TASK_STATUS_WIP,
                branchName,
                jira: {
                    mainTicket: {id, name: jiraTicket, description},
                    relatedTickets: [],
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
}

export default createTask;

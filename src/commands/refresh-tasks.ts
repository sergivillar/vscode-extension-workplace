import * as vscode from 'vscode';
import settings from '../settings';
import api from '../api';
import git from '../git';
import {Task, TASK_STATUS_WIP} from '../model';
import {taskProvider} from '../views/tasks';

function refreshTasks(context: vscode.ExtensionContext): (...args: any[]) => any {
    return async () => {
        const tasks = context.workspaceState.get('tasks');
        const {username} = settings.getSettings();
        console.log(tasks);

        try {
            // const {data} = await api.fetchJiraTicket(jiraTicket);
            // const {
            //     id,
            //     key,
            //     fields: {summary, description},
            // } = data;
            // const branchNameSuggested = `${username}-${key}-${summary.replace(/ /g, '-')}`;
            // const branchName = await vscode.window.showInputBox({
            //     value: branchNameSuggested,
            //     ignoreFocusOut: true,
            // });
            // if (!branchName) {
            //     return vscode.window.showErrorMessage('A new branch name should be provided');
            // }
            // git.createBranch(branchName);
            // const dataToSave: Task = {
            //     status: TASK_STATUS_WIP,
            //     branchName,
            //     jira: {
            //         mainTicket: {id, name: jiraTicket, description},
            //         relatedTickets: [],
            //     },
            //     createdAt: Date.now(),
            // };
            // await context.workspaceState.update('tasks', [dataToSave]);
            // taskProvider.refresh();
            // vscode.window.showInformationMessage(`Your new branch ${branchName} has been created`);
        } catch (error) {
            console.error(error);
            return vscode.window.showErrorMessage("There's any problem creating the new feature.");
        }
    };
}

export default refreshTasks;

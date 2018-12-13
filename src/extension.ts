import * as vscode from 'vscode';
import settings from './settings';
import api from './api';
import {WorkingNodeProvider} from './WorkingNodeProvide';
import git from './git';
import {Working} from './model';

export async function activate(context: vscode.ExtensionContext) {
    // await settings.configureExtension();

    vscode.window.registerTreeDataProvider('workingOn', new WorkingNodeProvider(context));

    vscode.commands.registerCommand('novum-webapp-workplace.openInBrowser', url =>
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${url}`))
    );

    const disposable = vscode.commands.registerCommand('novum-webapp-workplace.working.create', async () => {
        const {username} = settings.getSettings();

        const jiraTicket = await vscode.window.showInputBox({
            placeHolder: 'Enter your Jira ticket (e.g ACCOUNT-XXXX)',
            value: 'ACCOUNT-6781',
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

            const dataToSave: Working = {
                branchName,
                jira: {
                    mainTicket: {id, name: jiraTicket, description},
                    realtedTickets: [],
                },
            };

            context.workspaceState.update('working', [dataToSave]);

            vscode.window.showInformationMessage(`Your new branch ${branchName} has been created`);
        } catch (error) {
            console.error(error);
            return vscode.window.showErrorMessage("There's any problem creating the new feature.");
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// export function deactivate() {}

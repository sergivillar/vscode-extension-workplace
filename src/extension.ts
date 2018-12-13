import * as vscode from 'vscode';
import settings from './settings';
import api from './api';
import {WorkingNodeProvider} from './WorkingNodeProvide';

export async function activate(context: vscode.ExtensionContext) {
    await settings.configureExtension();

    vscode.window.registerTreeDataProvider('workingOn', new WorkingNodeProvider());

    const disposable = vscode.commands.registerCommand('novum-webapp-workplace.working.create', async () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        const jiraTicket = await vscode.window.showInputBox({
            placeHolder: 'Enter your Jira ticket (e.g ACCOUNT-XXXX)',
            ignoreFocusOut: true,
        });

        if (!jiraTicket) {
            return vscode.window.showErrorMessage('You should provide your JIRA ticket');
        }

        try {
            const response = await api.fetchJiraTicket(jiraTicket);
            console.log(response);
        } catch (error) {
            console.error(error);
        }

        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// export function deactivate() {}

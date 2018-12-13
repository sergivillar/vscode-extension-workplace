import * as vscode from 'vscode';
import Settings from './settings';
import {WorkingNodeProvider} from './WorkingNodeProvide';

export async function activate(context: vscode.ExtensionContext) {
    const settings = new Settings();
    await settings.configureExtension();

    vscode.window.registerTreeDataProvider('workingOn', new WorkingNodeProvider());

    const disposable = vscode.commands.registerCommand('novum-webapp-workplace.working.create', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// export function deactivate() {}

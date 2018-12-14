import * as vscode from 'vscode';
import {TaskNodeProvider} from './views/tasks';
import createTask from './commands/new-task';

export async function activate(context: vscode.ExtensionContext) {
    // await settings.configureExtension();

    const TaksView = new TaskNodeProvider(context);
    vscode.window.registerTreeDataProvider('tasks', TaksView);

    vscode.commands.registerCommand('novum-webapp-workplace.openInBrowser', url =>
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${url}`))
    );

    vscode.commands.registerCommand('novum-webapp-workplace.tasks.refresh', () => TaksView.refresh());

    const disposable = vscode.commands.registerCommand(
        'novum-webapp-workplace.tasks.create',
        createTask(context)
    );

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// export function deactivate() {}

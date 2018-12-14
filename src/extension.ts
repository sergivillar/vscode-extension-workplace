import * as vscode from 'vscode';
import {activateView, taskProvider} from './views/tasks';
import createTask from './commands/new-task';

export async function activate(context: vscode.ExtensionContext) {
    // await settings.configureExtension();
    context.workspaceState.update('tasks', []);

    activateView(context);

    vscode.commands.registerCommand('novum-webapp-workplace.openInBrowser', url =>
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${url}`))
    );

    vscode.commands.registerCommand('novum-webapp-workplace.tasks.refresh', () => taskProvider.refresh());

    const disposable = vscode.commands.registerCommand(
        'novum-webapp-workplace.tasks.create',
        createTask(context)
    );

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// export function deactivate() {}

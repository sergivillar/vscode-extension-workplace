import * as vscode from 'vscode';
import {activateView} from './views/tasks';
import createTask from './commands/new-task';
import refreshTasks from './commands/refresh-tasks';
import promoteTaks from './commands/promote-task';
import Settings from './settings';
import {TaskNode} from './nodes';

export async function activate(context: vscode.ExtensionContext) {
    await Settings.configureExtension();
    await context.workspaceState.update('tasks', [
        {
            id: '123123',
            status: 'working',
            branchName: 'sfernandez-ACCOUNT-7651-prueba',
            tickets: {
                main: {
                    id: 278515,
                    key: 'ACCOUNT-7651',
                    name: 'Prueba',
                    description: 'Description',
                },
                related: [],
            },
            createdAt: Date.now(),
        },
    ]);

    activateView(context);
    context.subscriptions.push(
        vscode.commands.registerCommand('novum-webapp-workplace.openInBrowser', url =>
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${url}`))
        ),
        vscode.commands.registerCommand('novum-webapp-workplace.tasks.refresh', refreshTasks(context)),
        vscode.commands.registerCommand('novum-webapp-workplace.tasks.create', createTask(context)),
        vscode.commands.registerCommand('novum-webapp-workplace.tasks.promote', (task: TaskNode) =>
            promoteTaks(task, context)
        )
    );

    await refreshTasks(context)();
}

// this method is called when your extension is deactivated
// export function deactivate() {}

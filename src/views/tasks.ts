import * as vscode from 'vscode';
import {JIRA_TICKET_URL} from '../constants';
import {Tasks, Task, JiraTicket, isTask, isJiraTicket} from '../model';

export let taskProvider: TaskNodeProvider;

export const activateView = (context: vscode.ExtensionContext) => {
    taskProvider = new TaskNodeProvider(context);
    vscode.window.registerTreeDataProvider('tasks', taskProvider);
};

export class TaskNodeProvider implements vscode.TreeDataProvider<TaskTreeItem> {
    tasks: Tasks | null | undefined = null;
    context: vscode.ExtensionContext;

    // tslint:disable-next-line:variable-name
    _onDidChangeTreeData: vscode.EventEmitter<TaskTreeItem | undefined> = new vscode.EventEmitter<
        TaskTreeItem | undefined
    >();
    onDidChangeTreeData: vscode.Event<TaskTreeItem | undefined> = this._onDidChangeTreeData.event;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.tasks = context.workspaceState.get('tasks');
    }

    refresh(): void {
        this.tasks = this.context.workspaceState.get('tasks');
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: TaskTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: TaskTreeItem): Promise<TaskTreeItem[]> {
        // No tasks in user storage
        if (!this.tasks) {
            return [];
        }

        // First level, show all tasks branches
        if (!element) {
            return this.tasks.map(
                item => new TaskTreeItem(item, item.branchName, vscode.TreeItemCollapsibleState.Collapsed)
            );
        }

        const children = [];
        // Second level, gather all Jira tickets
        if (isTask(element.data)) {
            children.push(
                new TaskTreeItem(element.data.jira, 'Jira', vscode.TreeItemCollapsibleState.Collapsed)
            );
        }

        // Third level, show all Jira tickets
        if (isJiraTicket(element.data)) {
            children.push(
                new TaskTreeItem(null, element.data.mainTicket.name, vscode.TreeItemCollapsibleState.None, {
                    command: 'novum-webapp-workplace.openInBrowser',
                    title: '',
                    arguments: [`${JIRA_TICKET_URL}${element.data.mainTicket.name}`],
                })
            );
        }

        return Promise.resolve(children);
    }
}

type Data = Task | JiraTicket | null;

class TaskTreeItem extends vscode.TreeItem {
    data: Data;

    constructor(
        data: Data,
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState,
        command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.data = data;
        this.command = command;
    }
}

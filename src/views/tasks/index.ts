import * as vscode from 'vscode';
import {
    TreeNode,
    TaskNode,
    Tasks,
    TaskStatusNode,
    TASK_STATUS,
} from '../../nodes';
import tickets from './tickets';
import reviews from './reviews';
import task from './task';

export let taskProvider: TaskNodeProvider;

export const activateView = (context: vscode.ExtensionContext) => {
    taskProvider = new TaskNodeProvider(context);
    vscode.window.registerTreeDataProvider('tasks', taskProvider);
};

export class TaskNodeProvider implements vscode.TreeDataProvider<TreeNode> {
    tasks: Tasks | null | undefined = null;
    context: vscode.ExtensionContext;

    private _onDidChangeTreeData = new vscode.EventEmitter<TreeNode | undefined>();
    onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.tasks = context.workspaceState.get('tasks');
    }

    refresh() {
        this.tasks = this.context.workspaceState.get('tasks');
        this._onDidChangeTreeData.fire();
    }

    getTreeItem({treeItem}: TreeNode): vscode.TreeItem {
        return treeItem;
    }

    async getChildren(element?: TreeNode) {
        if (!this.tasks) {
            return [];
        }

        if (!element) {
            return TASK_STATUS.map(status => {
                const numerOfTask = this.tasks && this.tasks.filter(item => item.status === status).length;
                return {
                    type: 'task-status',
                    data: status,
                    treeItem: {
                        label: `${status.charAt(0).toUpperCase()}${status.slice(1)} (${numerOfTask})`,
                        collapsibleState:
                            Number(numerOfTask) > 0
                                ? vscode.TreeItemCollapsibleState.Collapsed
                                : vscode.TreeItemCollapsibleState.None,
                    },
                } as TaskStatusNode;
            });
        }

        switch (element.type) {
            case 'task-status': {
                return this.tasks
                    .filter(item => item.status === element.data)
                    .map(
                        item =>
                            ({
                                type: 'task',
                                data: item,
                                treeItem: {
                                    label: item.branchName,
                                    collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                                    contextValue: 'task',
                                },
                            } as TaskNode)
                    );
            }
            case 'task':
                return task(element);

            case 'tickets':
                return tickets(element);

            case 'reviews':
                return reviews(element);

            default:
                return [];
        }
    }
}

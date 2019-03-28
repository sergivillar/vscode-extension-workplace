import * as vscode from 'vscode';
import {TreeNode, ReviewNode, TaskNode, Tasks, TicketNode, TicketsNode, ReviewsNode} from '../nodes';

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

    getTreeItem(element: TreeNode): vscode.TreeItem {
        return element.treeItem;
    }

    getChildren(element?: TreeNode) {
        // No tasks in user storage
        if (!this.tasks) {
            return [];
        }
        console.log(element);

        // First level, show all tasks branches
        if (!element) {
            return this.tasks.map(item => {
                const task: TaskNode = {
                    type: 'task',
                    data: item,
                    treeItem: {
                        label: item.branchName,
                        collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                    },
                };
                return task;
            });
        }

        const children = [];

        switch (element.type) {
            case 'task':
                {
                    const jiraNode: TicketsNode = {
                        type: 'tickets',
                        data: element.data.tickets,
                        treeItem: {
                            label: 'Tickets',
                            collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                        },
                    };
                    children.push(jiraNode);

                    if (element.data.reviews) {
                        const fisheyeReviewsNode: ReviewsNode = {
                            type: 'reviews',
                            data: element.data.reviews,
                            treeItem: {
                                label: 'Reviews',
                                collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                            },
                        };
                        children.push(fisheyeReviewsNode);
                    }
                }
                break;

            case 'tickets':
                {
                    const ticket = element.data.main;
                    const node: TicketNode = {
                        type: 'ticket',
                        data: ticket,
                        treeItem: {
                            label: ticket.name,
                            collapsibleState: vscode.TreeItemCollapsibleState.None,
                            command: {
                                command: 'novum-webapp-workplace.openInBrowser',
                                title: '',
                                arguments: [`https://jira.tuenti.io/jira/browse/${ticket.key}`],
                            },
                        },
                    };
                    children.push(node);
                }
                break;

            case 'reviews':
                {
                    for (const review of element.data) {
                        const node: ReviewNode = {
                            type: 'review',
                            data: review,
                            treeItem: {
                                label: `${review.id} - ${review.name}`,
                                collapsibleState: vscode.TreeItemCollapsibleState.None,
                                command: {
                                    command: 'novum-webapp-workplace.openInBrowser',
                                    title: '',
                                    arguments: [`https://fisheye.tuenti.io/cru/${review.id}`],
                                },
                            },
                        };
                        children.push(node);
                    }
                }
                break;

            default:
                break;
        }

        return Promise.resolve(children);
    }
}
/**
class TaskTreeItem extends vscode.TreeItem {
    node: TreeNode | null;

    constructor(
        node: TreeNode | null,
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState,
        command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.node = node;
        this.command = command;
    }
}*/

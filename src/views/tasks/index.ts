import * as vscode from 'vscode';
import {
    TreeNode,
    ReviewNode,
    TaskNode,
    Tasks,
    TicketNode,
    TicketsNode,
    ReviewsNode,
    TaskStatusNode,
    TASK_STATUS,
} from '../../nodes';
import {getReviewComments} from '../../api/fisheye';
import Settings from '../../settings';

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
                const taskStatus: TaskStatusNode = {
                    type: 'task-status',
                    data: status,
                    treeItem: {
                        label: `${status.charAt(0).toUpperCase()}${status.slice(1)} (${numerOfTask})`,
                        collapsibleState:
                            Number(numerOfTask) > 0
                                ? vscode.TreeItemCollapsibleState.Collapsed
                                : vscode.TreeItemCollapsibleState.None,
                    },
                };
                return taskStatus;
            });
        }

        const children = [];

        switch (element.type) {
            case 'task-status': {
                const taskNodes = this.tasks
                    .filter(item => item.status === element.data)
                    .map(item => {
                        const task: TaskNode = {
                            type: 'task',
                            data: item,
                            treeItem: {
                                label: item.branchName,
                                collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                                contextValue: 'task',
                            },
                        };
                        return task;
                    });
                children.push(...taskNodes);

                break;
            }
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
                        const comments = await getReviewComments(review.id, Settings.authToken);
                        const node: ReviewNode = {
                            type: 'review',
                            data: review,
                            treeItem: {
                                label: `${review.id} - ${review.name} (${comments.length})`,
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

        return children;
    }
}

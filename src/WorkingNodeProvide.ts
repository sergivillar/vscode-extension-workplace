import * as vscode from 'vscode';
import {JIRA_TICKET_URL} from './constants';
import {Workings} from './model';

export class WorkingNodeProvider implements vscode.TreeDataProvider<Working> {
    working: Workings | null | undefined = null;

    // tslint:disable-next-line:variable-name
    _onDidChangeTreeData: vscode.EventEmitter<Working | undefined> = new vscode.EventEmitter<
        Working | undefined
    >();
    onDidChangeTreeData: vscode.Event<Working | undefined> = this._onDidChangeTreeData.event;

    constructor(context: vscode.ExtensionContext) {
        this.working = context.workspaceState.get('working');
    }

    getTreeItem(element: Working): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Working): Thenable<Working[]> {
        // No working in user storage
        if (!this.working) {
            return Promise.resolve([]);
        }

        // First level, show all working branches
        if (!element) {
            return Promise.resolve(
                this.working.map(
                    item => new Working(item, item.branchName, vscode.TreeItemCollapsibleState.Collapsed)
                )
            );
        }

        const children = [];
        // Second level, gather all Jira tickets
        if (element.data.jira) {
            children.push(new Working(element.data.jira, 'Jira', vscode.TreeItemCollapsibleState.Collapsed));
        }

        // Third level, show all Jira tickets
        if (element.label === 'Jira') {
            children.push(
                new Working({}, element.data.mainTicket.name, vscode.TreeItemCollapsibleState.None, {
                    command: 'novum-webapp-workplace.openInBrowser',
                    title: '',
                    arguments: [`${JIRA_TICKET_URL}${element.data.mainTicket.name}`],
                })
            );
        }

        return Promise.resolve(children);
    }
}

class Working extends vscode.TreeItem {
    data: any = {};

    constructor(
        data: any,
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState,
        command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.data = data;
        this.command = command;
    }
}

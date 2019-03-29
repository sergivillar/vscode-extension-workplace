import { TicketNode, TicketsNode } from "../../nodes";
import { TreeItemCollapsibleState } from "vscode";

export default (element: TicketsNode) => {
    const ticket = element.data.main;
    const node: TicketNode = {
        type: 'ticket',
        data: ticket,
        treeItem: {
            label: ticket.name,
            collapsibleState: TreeItemCollapsibleState.None,
            command: {
                command: 'novum-webapp-workplace.openInBrowser',
                title: '',
                arguments: [`https://jira.tuenti.io/jira/browse/${ticket.key}`],
            },
        },
    };
    return [node];
}
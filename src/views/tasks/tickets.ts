import {TicketNode, TicketsNode} from '../../nodes';
import {TreeItemCollapsibleState} from 'vscode';

export default ({data: {main: ticket}}: TicketsNode) => [
    {
        type: 'ticket',
        data: ticket,
        treeItem: {
            label: ticket.name,
            collapsibleState: TreeItemCollapsibleState.None,
            command: {
                command: 'webapp-workplace.openInBrowser',
                title: '',
                arguments: [`https://jira.tuenti.io/jira/browse/${ticket.key}`],
            },
        },
    } as TicketNode,
];
